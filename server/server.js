// Minimal, secure comments API using Express and SQLite (better-sqlite3)
// - Stores comments permanently in a SQLite database (server/comments.db)
// - Escapes/sanitizes input, enforces length limits, rate-limits by IP
// - Simple normalization + blocklist to detect severe profanity / slurs

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const path = require('path');
const Database = require('better-sqlite3');
const xss = require('xss');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'comments.db');
const PORT = process.env.PORT || 3000;

// Ensure folder exists
if (!fs.existsSync(__dirname)) fs.mkdirSync(__dirname, { recursive: true });

// Open (or create) the database
const db = new Database(DB_PATH);

// Initialize schema
db.prepare(`
CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    comment TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    ip TEXT
);
`).run();

// Prepared statements
const insertComment = db.prepare('INSERT INTO comments (name, comment, created_at, ip) VALUES (?, ?, ?, ?)');
const selectComments = db.prepare('SELECT id, name, comment, created_at FROM comments ORDER BY created_at DESC');
const countComments = db.prepare('SELECT COUNT(*) as c FROM comments');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1kb' })); // small limit; comments limited to 500 chars

// Rate limit: one comment per 30 seconds per IP
const postLimiter = rateLimit({
    windowMs: 30 * 1000,
    max: 1,
    message: { error: 'You may only post one comment every 30 seconds. Please wait a moment and try again.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Profanity / slur detection
// NOTE: This is a best-effort blocklist for common severe profanity and slurs.
// It normalizes text to catch common obfuscations (symbols, numbers, repeated letters).
const BLOCKLIST = [
    // severe profanity (examples)
    'fuck', 'fucker', 'motherfucker', 'cunt', 'shit', 'bitch',
    // discriminatory slurs (examples) - include common slurs
    'nigger', 'fag', 'faggot', 'chink', 'spic', 'kike', 'retard', 'gook', 'wetback',
    // other highly abusive terms
    'slut', 'whore'
];

function normalizeForMatch(s) {
    // Lowercase
    let t = s.toLowerCase();
    // Replace common leet substitutions
    const map = { '4': 'a', '@': 'a', '8': 'b', '3': 'e', '6': 'g', '1': 'i', '!': 'i', '0': 'o', '5': 's', '$': 's', '7': 't', '+': 't' };
    t = t.split('').map(ch => map[ch] || ch).join('');
    // Remove non letters
    t = t.replace(/[^a-z]/g, '');
    // Collapse repeated letters (loooool => lol)
    t = t.replace(/(.)\1{2,}/g, '$1$1'); // allow up to 2 repeated letters
    return t;
}

function containsBlockedLanguage(s) {
    const normalized = normalizeForMatch(s);
    for (const bad of BLOCKLIST) {
        const bn = normalizeForMatch(bad);
        if (bn.length === 0) continue;
        if (normalized.includes(bn)) return true;
    }
    return false;
}

// API: get comments
app.get('/api/comments', (req, res) => {
    try {
        const rows = selectComments.all();
        const total = countComments.get().c;
        return res.json({ total, comments: rows });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to load comments' });
    }
});

// API: post comment
app.post('/api/comments', postLimiter, (req, res) => {
    try {
        let { name, comment } = req.body || {};
        if (!comment || typeof comment !== 'string') {
            return res.status(400).json({ error: 'Comment is required.' });
        }
        // Trim and enforce length
        comment = comment.trim();
        if (comment.length === 0) return res.status(400).json({ error: 'Comment is required.' });
        if (comment.length > 500) return res.status(400).json({ error: 'Comments are limited to 500 characters.' });

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            name = 'Anonymous';
        } else {
            name = name.trim().slice(0, 100);
        }

        // Detect blocked language
        if (containsBlockedLanguage(name) || containsBlockedLanguage(comment)) {
            return res.status(400).json({ error: 'Your comment was rejected because it contained disallowed language. Please revise and try again.' });
        }

        // Sanitize with xss to remove tags and attributes
        const cleanName = xss(name);
        const cleanComment = xss(comment);

        const now = Date.now();
        const ip = req.ip || req.headers['x-forwarded-for'] || '';

        const info = insertComment.run(cleanName, cleanComment, now, ip);
        const id = info.lastInsertRowid;

        const commentObj = { id, name: cleanName, comment: cleanComment, created_at: now };

        return res.status(201).json({ comment: commentObj });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to save comment' });
    }
});

// Serve static files for simple local testing (optional)
app.use(express.static(path.join(__dirname, '..')));

app.listen(PORT, () => {
    console.log(`Comments server listening on port ${PORT}`);
});
