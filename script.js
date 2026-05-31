// ============================================
// ACC SECTION - RANDOM IMAGE GALLERY
// ============================================

// Image bank - Add your image URLs here
// TO ADD YOUR OWN IMAGES FROM GOOGLE DRIVE:
// 1. Upload images to your Google Drive folder
// 2. Right-click each image > Share > "Anyone with the link"
// 3. Copy the link, extract the FILE_ID
// 4. Use format: https://drive.google.com/uc?id=FILE_ID&export=download
// 5. Add to array below

const imageBank = [
    'https://via.placeholder.com/800x600?text=ACC+Image+1',
    'https://via.placeholder.com/800x600?text=ACC+Image+2',
    'https://via.placeholder.com/800x600?text=ACC+Image+3',
    'https://via.placeholder.com/800x600?text=ACC+Image+4',
    'https://via.placeholder.com/800x600?text=ACC+Image+5',
    // Example with Google Drive:
    // 'https://drive.google.com/uc?id=1Dcl3A74mAACu9HUBmdFEQu1UCvgRobjg&export=download',
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