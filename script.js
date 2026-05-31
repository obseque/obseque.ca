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
    // TO ADD YOUR OWN IMAGES:
    // 1. Upload your images to a hosting service (imgur, Cloudinary, etc.)
    // 2. Get the direct image URL
    // 3. Add it to this array like this:
    // 'https://your-image-hosting.com/image1.jpg',
    // 4. Save and refresh your website
];

// Load random image on page load
window.addEventListener('DOMContentLoaded', () => {
    loadRandomImage();
    loadFilms();
    setupNavigation();
});

function loadRandomImage() {
    if (imageBank.length === 0) {
        console.log('Image bank is empty. Add images to the imageBank array in script.js');
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
        title: 'memento mori câlisse',
        thumbnail: 'https://img.youtube.com/vi/u28oM7qivUE/maxresdefault.jpg',
        link: 'https://youtu.be/u28oM7qivUE?si=eH-7rTtPfwaReOZx'
    },
    {
        id: 2,
        title: 'Un film par Obsèque',
        thumbnail: 'https://img.youtube.com/vi/5V-AFPsxIWw/maxresdefault.jpg',
        link: 'https://youtu.be/5V-AFPsxIWw?si=9EOuNhkGg9dUxsfn'
    },
    {
        id: 3,
        title: 'FLIP',
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