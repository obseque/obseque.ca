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
