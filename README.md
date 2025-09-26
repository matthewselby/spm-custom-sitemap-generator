# SPM Custom Sitemap Generator

A tool that helps users create XML sitemaps for Smart Plugin Manager's visual regression testing. Take control of which pages get tested during plugin updates instead of relying on random page selection.

## Features

- **Custom URL Selection**: Choose exactly which pages SPM tests
- **Smart Validation**: URL validation with protocol switching (HTTP/HTTPS)
- **Real-time Stats**: See sitemap size and SPM coverage estimates
- **XML Generation**: Downloads compliant XML sitemaps
- **WP Engine Integration**: Built specifically for Smart Plugin Manager

## Development

### Prerequisites

- Node.js (16+ recommended)
- pnpm

### Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start development server:**
   ```bash
   pnpm run dev
   ```
   This will start Parcel dev server with hot reloading at `http://localhost:1234`

3. **Build for production:**
   ```bash
   pnpm run build
   ```
   Creates optimized files in `dist/` directory

### Available Scripts

- `pnpm run dev` - Start development server with hot reloading
- `pnpm run build` - Build optimized production files
- `pnpm run clean` - Remove build artifacts
- `pnpm start` - Alias for `pnpm run dev`

### Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── app.js             # JavaScript functionality
├── package.json       # Dependencies and scripts
├── dist/              # Built files (created by Parcel)
└── README.md          # This file
```

## How SPM Uses Custom Sitemaps

- **Default**: SPM tests 10 random pages including homepage
- **With custom sitemap**: SPM selects up to 20 URLs from your sitemap
- **Random selection**: If 20+ URLs, SPM tests homepage + 19 random pages
- **Best practice**: Include critical pages (checkout, forms, landing pages)

## Deployment

The `dist/` folder contains all files needed for deployment. Simply upload the contents to any static hosting service.

## Author

Built by **Matt Selby** for **WP Engine Smart Plugin Manager** - Automated plugin updates with visual regression testing.