// ============================================
// FILMS SECTION - THUMBNAIL GRID
// ============================================

// Films data structure - Update with your films
const filmsData = [
    {
        id: 1,
        title: 'memento mori câlisse',
        runtime: '4:59',
        thumbnail: 'https://img.youtube.com/vi/u28oM7qivUE/maxresdefault.jpg',
        link: 'https://youtu.be/u28oM7qivUE?si=eH-7rTtPfwaReOZx'
    }
];

// Random images for the right column
const randomImages = [
    '1_.jpg',
    '2_.jpg',
    '3_.jpg'
];

// Load films and random image on page load
window.addEventListener('DOMContentLoaded', () => {
    loadFilms();
    loadRandomImage();
    initComments();
});

function loadFilms() {
    const filmsGrid = document.getElementById('films-grid');
    filmsGrid.innerHTML = '';

    filmsData.forEach(film => {
        const filmElement = document.createElement('div');
        filmElement.className = 'film-item';
        filmElement.innerHTML = `
            <a href="${film.link}" target="_blank" rel="noopener noreferrer">
                <img src="${film.thumbnail}" alt="${film.title}" class="film-thumbnail">
            </a>
            <p class="film-title">${film.title}</p>
            <p class="film-runtime">${film.runtime}</p>
        `;
        filmsGrid.appendChild(filmElement);
    });
}

function loadRandomImage() {
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    const selectedImage = randomImages[randomIndex];
    const imageElement = document.getElementById('random-image');
    if (imageElement) {
        imageElement.src = selectedImage;
        console.log('Loaded random image:', selectedImage);
    }
}

// ==========================
// COMMENTS - client-side
// ==========================

const COMMENTS_API = '/api/comments';
let commentsCache = [];

function initComments() {
    const form = document.getElementById('comment-form');
    form.addEventListener('submit', handleCommentSubmit);
    fetchComments();
}

async function fetchComments() {
    try {
        const res = await fetch(COMMENTS_API);
        if (!res.ok) throw new Error('Failed to load comments');
        const data = await res.json();
        commentsCache = data.comments || [];
        document.getElementById('comments-count').textContent = data.total || commentsCache.length;
        renderComments();
    } catch (err) {
        console.error(err);
    }
}

function renderComments() {
    const list = document.getElementById('comments-list');
    list.innerHTML = '';

    commentsCache.forEach(c => {
        const item = document.createElement('div');
        item.className = 'comment-item';

        const meta = document.createElement('div');
        meta.className = 'comment-meta';

        const author = document.createElement('div');
        author.className = 'comment-author';
        author.textContent = c.name || 'Anonymous';

        const date = document.createElement('div');
        date.className = 'comment-date';
        const d = new Date(c.created_at);
        date.textContent = d.toLocaleString();

        meta.appendChild(author);
        meta.appendChild(date);

        const body = document.createElement('div');
        body.className = 'comment-body';
        body.textContent = c.comment;

        item.appendChild(meta);
        item.appendChild(body);

        list.appendChild(item);
    });
}

async function handleCommentSubmit(e) {
    e.preventDefault();
    const textarea = document.getElementById('comment-input');
    const nameInput = document.getElementById('name-input');
    const errorEl = document.getElementById('comment-error');
    const submitBtn = document.getElementById('submit-comment');

    errorEl.textContent = '';

    const comment = textarea.value.trim();
    let name = nameInput.value.trim();
    if (!name) name = 'Anonymous';

    if (!comment) {
        errorEl.textContent = 'Please enter a comment.';
        return;
    }

    if (comment.length > 500) {
        errorEl.textContent = 'Comments are limited to 500 characters.';
        return;
    }

    submitBtn.disabled = true;

    try {
        const res = await fetch(COMMENTS_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, comment })
        });

        const data = await res.json();
        if (!res.ok) {
            errorEl.textContent = data && data.error ? data.error : 'Failed to post comment.';
            submitBtn.disabled = false;
            return;
        }

        // Prepend new comment locally to show instantly
        commentsCache.unshift(data.comment);
        document.getElementById('comments-count').textContent = commentsCache.length;
        renderComments();

        // Reset form
        textarea.value = '';
        nameInput.value = '';
    } catch (err) {
        console.error(err);
        errorEl.textContent = 'Network error posting comment.';
    } finally {
        submitBtn.disabled = false;
    }
}
