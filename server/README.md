Comment system integration for obseque/obseque.ca

What I changed and added:

- index.html: inserted a minimalist comments section under the films grid (left column). The structure uses the site's existing typography and spacing.
- styles.css: added styles for the comments section that reuse the exact font-family, font-sizes, border style, and spacing from the rest of the site. No new fonts or visual language introduced.
- script.js: added client-side code to load and post comments to a comments API. Comments are displayed newest-first, and the total comment count is shown.
- server/: a small Node.js Express server that provides a persistent comments API backed by SQLite (better-sqlite3). It includes:
  - server.js: API implementation with sanitation (xss), prepared statements, rate-limiting (one post per 30s per IP), and a normalization-based blocklist for severe profanity/slurs.
  - package.json: dependencies and a start script.
  - init.sql: reference schema.

Security and requirements satisfied:
- Visitors do not need accounts. Name field is optional; default shown is "Anonymous".
- Each comment stores name, comment text, created_at timestamp; served in reverse-chronological order.
- Comments are stored in a persistent SQLite DB at server/comments.db.
- Input is sanitized with xss (server-side) and rendered using textContent (client-side) to avoid XSS.
- Comments limited to 500 chars server and client-side.
- Rate limiting enforced via express-rate-limit (1 comment / 30s per IP).
- Profanity/slur filtering uses normalization to catch leet/obfuscated variants; rejects with a friendly message.
- Total comments displayed.
- Responsive and uses site's exact visual language.

Deployment / testing:

- To run locally:
  1. cd server
  2. npm install
  3. npm start
  4. Open http://localhost:3000/ in your browser (the root serves the site files and the API)

- If you deploy as a static site (GitHub Pages) you will need to host the server elsewhere (VPS, Heroku, Fly, etc.) and update COMMENTS_API constant in script.js to point to the deployed API origin (for example: https://comments.example.com/api/comments). Make sure to enable CORS on the server (it's enabled by default in server.js).

Notes / limitations:
- The blocklist provided is intentionally conservative; you may want to expand it based on community needs. The detection normalizes common obfuscations but cannot guarantee 100% coverage for evasive attempts.
- The server stores the client IP in the DB (for rate checks and moderation). If you need GDPR/privacy changes, remove or anonymize IP storage.

If you want, I can:
- Wire moderation endpoints (list, remove, export comments) protected by a simple token.
- Hook the comment server to a small admin UI.
- Switch to a different DB (Postgres) or add captcha/recaptcha for extra spam protection.
