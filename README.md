# OBSÈQUE Portfolio

Minimalist artist portfolio inspired by Tom Sachs' design aesthetic.

## Website Structure

### Sections
1. **ACC** - Random image gallery from your uploaded image bank
2. **FILMS** - Film/video portfolio with thumbnail links to Vimeo/YouTube
3. **PHOTOS** - Photography portfolio grid
4. **CONTACT** - Contact form

## How to Update Your Content

### 1. ACC Section (Random Images)

Edit `script.js` and update the `imageBank` array:

```javascript
const imageBank = [
    'https://your-image-url-1.jpg',
    'https://your-image-url-2.jpg',
    'https://your-image-url-3.jpg',
    // Add more image URLs
];
```

### 2. Films Section

Edit `script.js` and update the `filmsData` array:

```javascript
const filmsData = [
    {
        id: 1,
        title: 'Your Film Title',
        thumbnail: 'https://your-thumbnail-url.jpg',
        link: 'https://vimeo.com/YOUR_VIDEO_ID' // or YouTube link
    },
    // Add more films
];
```

### 3. Photos Section

Edit `script.js` and update the `photosData` array:

```javascript
const photosData = [
    { id: 1, url: 'https://your-photo-url-1.jpg' },
    { id: 2, url: 'https://your-photo-url-2.jpg' },
    // Add more photos
];
```

### 4. Contact Form

The contact form uses Formspree for email delivery. To set it up:

1. Go to [formspree.io](https://formspree.io)
2. Sign up and create a new form
3. You'll get a form ID
4. In `script.js`, replace `YOUR_FORM_ID` with your actual form ID in this line:
   ```javascript
   fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

## Hosting & Domain Setup

### Deploy to GitHub Pages

1. Go to your repository settings
2. Scroll to "GitHub Pages" section
3. Select `main` branch as the source
4. Your site will be live at `https://obseque.github.io/obseque.ca`

### Connect Your GoDaddy Domain

1. In your GitHub repo, go to **Settings** > **Pages**
2. Add your custom domain: `obseque.ca`
3. In GoDaddy DNS settings, add these records:
   - **Type:** A
   - **Name:** @
   - **Value:** `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **TTL:** 1 hour

4. Add CNAME record for `www`:
   - **Type:** CNAME
   - **Name:** www
   - **Value:** `obseque.github.io`
   - **TTL:** 1 hour

5. Wait 24 hours for DNS propagation
6. Enable "Enforce HTTPS" in GitHub Pages settings

## Design Philosophy

This site follows Tom Sachs' minimalist design principles:
- Clean, functional aesthetic
- Maximum whitespace
- Stark black and white color palette
- Clear typography
- No unnecessary animations
- Focus on content

## File Structure

```
.
├── index.html       # Main HTML file
├── styles.css       # Minimalist styling
├── script.js        # JavaScript functionality
└── README.md        # This file
```

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages (hosting)
- Formspree (contact form)

## Quick Tips

- Images should be high quality and properly sized (800x600px or larger)
- Keep film thumbnails consistent size (400x300px)
- Test the contact form before going live
- Use descriptive titles for films and photos
- Optimize images for web to improve load time

---

**Made with minimalist intent. Less is more.**