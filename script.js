// ============================================
// ACC SECTION - RANDOM IMAGE GALLERY
// ============================================

// Image bank - Add your image URLs here
const imageBank = [
    'https://via.placeholder.com/800x600?text=ACC+Image+1',
    'https://via.placeholder.com/800x600?text=ACC+Image+2',
    'https://via.placeholder.com/800x600?text=ACC+Image+3',
    'https://via.placeholder.com/800x600?text=ACC+Image+4',
    'https://via.placeholder.com/800x600?text=ACC+Image+5',
    // Replace these with your actual image URLs
];

// Load random image on page load
window.addEventListener('DOMContentLoaded', () => {
    loadRandomImage();
    loadFilms();
    loadPhotos();
    scrollToACC();
});

function loadRandomImage() {
    if (imageBank.length === 0) {
        console.log('Image bank is empty. Add images to the imageBank array.');
        return;
    }
    const randomIndex = Math.floor(Math.random() * imageBank.length);
    const randomImage = imageBank[randomIndex];
    document.getElementById('random-image').src = randomImage;
}

function scrollToACC() {
    const accSection = document.getElementById('acc');
    if (accSection) {
        accSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============================================
// FILMS SECTION - THUMBNAIL GRID
// ============================================

// Films data structure - Update with your films
const filmsData = [
    {
        id: 1,
        title: 'Film 1',
        thumbnail: 'https://via.placeholder.com/400x300?text=Film+1',
        link: 'https://vimeo.com/123456789' // Replace with your Vimeo/YouTube URL
    },
    {
        id: 2,
        title: 'Film 2',
        thumbnail: 'https://via.placeholder.com/400x300?text=Film+2',
        link: 'https://vimeo.com/123456790'
    },
    {
        id: 3,
        title: 'Film 3',
        thumbnail: 'https://via.placeholder.com/400x300?text=Film+3',
        link: 'https://vimeo.com/123456791'
    },
    // Add more films as needed
];

function loadFilms() {
    const filmsGrid = document.getElementById('films-grid');
    filmsGrid.innerHTML = '';

    filmsData.forEach(film => {
        const filmElement = document.createElement('div');
        filmElement.className = 'film-item';
        filmElement.innerHTML = `
            <a href="${film.link}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                <img src="${film.thumbnail}" alt="${film.title}" class="film-thumbnail">
                <div class="film-overlay">
                    <span class="play-icon">▶</span>
                </div>
            </a>
            <p class="film-title">${film.title}</p>
        `;
        filmsGrid.appendChild(filmElement);
    });
}

// ============================================
// PHOTOS SECTION - PHOTO GRID
// ============================================

// Photos data - Update with your photo URLs
const photosData = [
    { id: 1, url: 'https://via.placeholder.com/600x400?text=Photo+1' },
    { id: 2, url: 'https://via.placeholder.com/600x400?text=Photo+2' },
    { id: 3, url: 'https://via.placeholder.com/600x400?text=Photo+3' },
    { id: 4, url: 'https://via.placeholder.com/600x400?text=Photo+4' },
    { id: 5, url: 'https://via.placeholder.com/600x400?text=Photo+5' },
    { id: 6, url: 'https://via.placeholder.com/600x400?text=Photo+6' },
    // Add more photos as needed
];

function loadPhotos() {
    const photosGrid = document.getElementById('photos-grid');
    photosGrid.innerHTML = '';

    photosData.forEach(photo => {
        const photoElement = document.createElement('div');
        photoElement.className = 'photo-item';
        photoElement.innerHTML = `<img src="${photo.url}" alt="Photo ${photo.id}">`;
        photosGrid.appendChild(photoElement);
    });
}

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});