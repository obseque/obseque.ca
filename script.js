// ============================================
// FILMS & MEDIA SECTION - THUMBNAIL GRID
// ============================================

// Existing films (kept, memento will be shown below the two new videos)
const filmsData = [
    {
        id: 1,
        title: 'memento mori câlisse',
        runtime: '4:59',
        thumbnail: 'https://img.youtube.com/vi/u28oM7qivUE/maxresdefault.jpg',
        link: 'https://youtu.be/u28oM7qivUE?si=eH-7rTtPfwaReOZx'
    }
];

// New YouTube videos to add
const newVideos = [
    {
        id: 'VP9nTG6Pu_M',
        title: '', // left blank for manual edit
        runtime: '',
        thumbnail: 'https://img.youtube.com/vi/VP9nTG6Pu_M/maxresdefault.jpg',
        link: 'https://youtu.be/VP9nTG6Pu_M'
    },
    {
        id: '45ZqfHnofxI',
        title: '', // left blank for manual edit
        runtime: '',
        thumbnail: 'https://img.youtube.com/vi/45ZqfHnofxI/maxresdefault.jpg',
        link: 'https://youtu.be/45ZqfHnofxI'
    }
];

// Random images for the right column (kept but not used when replaced by videos)
const randomImages = [
    '1_.jpg',
    '2_.jpg',
    '3_.jpg'
];

// Load media on page load
window.addEventListener('DOMContentLoaded', () => {
    renderMediaGrid();
    loadRandomImage();
});

// Render a 2x2-like grid using existing site columns:
// - Left column will contain: Video1 on top-left, Memento on bottom-left
// - Right column will contain: Video2 on top-right (and keep image/other content below if present)
function renderMediaGrid() {
    const leftGrid = document.getElementById('films-grid');
    const rightContainer = document.getElementById('right-media') || document.querySelector('.image-container');

    if (!leftGrid || !rightContainer) return;

    // Clear existing left column
    leftGrid.innerHTML = '';

    // LEFT TOP: Video 1
    const v1 = newVideos[0];
    const v1El = document.createElement('div');
    v1El.className = 'film-item';
    v1El.innerHTML = `
        <a href="${v1.link}" target="_blank" rel="noopener noreferrer">
            <img src="${v1.thumbnail}" alt="${v1.title || v1.id}" class="film-thumbnail">
        </a>
        <p class="film-title">${v1.title}</p>
        <p class="film-runtime">${v1.runtime}</p>
    `;
    leftGrid.appendChild(v1El);

    // LEFT BOTTOM: existing memento (kept)
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
        leftGrid.appendChild(filmElement);
    });

    // RIGHT: place Video 2 at the top of the right column, replacing the random image area
    const v2 = newVideos[1];
    rightContainer.innerHTML = `
        <a href="${v2.link}" target="_blank" rel="noopener noreferrer" class="right-film-link">
            <img src="${v2.thumbnail}" alt="${v2.title || v2.id}" class="film-thumbnail" />
        </a>
        <p class="film-title">${v2.title}</p>
        <p class="film-runtime">${v2.runtime}</p>
    `;
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
