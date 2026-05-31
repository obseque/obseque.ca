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
    },
    {
        id: 2,
        title: 'Un film par Obsèque',
        runtime: '1:04',
        thumbnail: 'https://img.youtube.com/vi/5V-AFPsxIWw/maxresdefault.jpg',
        link: 'https://youtu.be/5V-AFPsxIWw?si=9EOuNhkGg9dUxsfn'
    },
    {
        id: 3,
        title: 'FLIP',
        runtime: '3:06',
        thumbnail: 'https://img.youtube.com/vi/X_1-4bnYSuI/maxresdefault.jpg',
        link: 'https://youtu.be/X_1-4bnYSuI?si=ND1Ihz9kSOF8-WTG'
    }
];

// Load films on page load
window.addEventListener('DOMContentLoaded', () => {
    loadFilms();
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