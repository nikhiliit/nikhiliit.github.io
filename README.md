# nikhiliit.github.io
Portfolio for Me
# Multi-Page Portfolio Website

This is a modern, responsive multi-page portfolio website with page transitions and loading animations. It's designed to showcase your skills, projects, and professional experience.

## Features

- Multi-page structure with smooth page transitions
- Loading animations between pages
- Responsive design that works on all devices
- Project filtering and detailed project modals
- Contact form with validation
- Testimonials slider
- Interactive FAQ section
- Skills visualization with progress bars
- Timeline for experience display
- Mobile-friendly navigation

## File Structure

```
nikhiliit.github.io/
├── index.html              # Home page
├── about.html              # About page
├── services.html           # Services page
├── portfolio.html          # Portfolio page
├── contact.html            # Contact page
├── css/
│   ├── style.css           # Main styles
│   └── transitions.css     # Page transition styles
├── js/
│   ├── navigation.js       # Main navigation handler
│   ├── loader.js           # Loading animation script
│   ├── portfolio.js        # Portfolio-specific scripts
│   ├── contact.js          # Contact form handling
│   └── about-testimonials.js # Testimonials slider
└── images/                 # Your images folder
```

## Getting Started

1. Replace all placeholder images with your own images
2. Update personal information, skills, projects, and experience
3. Customize colors by modifying the CSS files (primary color is currently `#4831D4`)
4. Update links to your social media profiles and GitHub account

## Customization Tips

### Changing Colors

The primary color is `#4831D4` (purple). To change it, search for this hex code in `style.css` and `transitions.css` and replace it with your preferred color.

### Adding Projects

To add a new project to the portfolio:

1. Add a new portfolio item in the grid inside `portfolio.html`
2. Create a corresponding project details section in the hidden div
3. Make sure to use the same project ID for both

### Custom Images

Replace all placeholder images with your own:

1. Replace the URL `https://via.placeholder.com/...` with your image paths
2. Recommended sizes:
   - Profile image: 500x500 pixels
   - Project thumbnails: 400x250 pixels
   - Project details: 800x500 pixels

## Hosting on GitHub Pages

1. Create a GitHub repository named `yourusername.github.io`
2. Upload all files to this repository
3. GitHub will automatically deploy your site to `https://yourusername.github.io`

## Browser Compatibility

This website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Credits

- Font Awesome for icons
- Google Fonts (Poppins)
- Placeholder images via placeholder.com

## License

Feel free to use this template for your personal portfolio.