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
    setupNavigation();
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

// ============================================
// FILMS SECTION - THUMBNAIL GRID
// ============================================

// Films data structure - Update with your films
const filmsData = [
    {
        id: 1,
        title: 'Film 1',
        thumbnail: 'https://img.youtube.com/vi/u28oM7qivUE/maxresdefault.jpg',
        link: 'https://youtu.be/u28oM7qivUE?si=eH-7rTtPfwaReOZx'
    },
    {
        id: 2,
        title: 'Film 2',
        thumbnail: 'https://img.youtube.com/vi/5V-AFPsxIWw/maxresdefault.jpg',
        link: 'https://youtu.be/5V-AFPsxIWw?si=9EOuNhkGg9dUxsfn'
    },
    {
        id: 3,
        title: 'Film 3',
        thumbnail: 'https://img.youtube.com/vi/X_1-4bnYSuI/maxresdefault.jpg',
        link: 'https://youtu.be/X_1-4bnYSuI?si=ND1Ihz9kSOF8-WTG'
    }
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
// NAVIGATION - SECTION SWITCHING
// ============================================

function setupNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}