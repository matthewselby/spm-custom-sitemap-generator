# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Live Site

**Production URL:** <https://spm-custom-sitemap-generator.pages.dev/>

This site is deployed on Cloudflare Pages and automatically updates when changes are pushed to the main branch.

## Commands

### Development

- `pnpm install` - Install dependencies
- `pnpm run dev` - Start development server with hot reloading at <http://localhost:1234>
- `pnpm run build` - Build production files to dist/ directory
- `pnpm run clean` - Remove build artifacts and cache
- `pnpm start` - Alias for dev command

### Package Manager

This project uses pnpm as specified in package.json packageManager field.

## Architecture

This is a single-page vanilla JavaScript application built by Matt Selby for generating XML sitemaps for WP Engine's Smart Plugin Manager (SPM). The app has a simple file structure:

### Core Files

- **index.html** - Complete UI layout with WP Engine branding, comprehensive meta tags, and documentation links
- **app.js** - All JavaScript functionality including URL validation, sitemap XML generation, and DOM manipulation
- **styles.css** - Complete CSS with WP Engine design system colors (#0ECAD4, #006BD6) and responsive design
- **assets/** - Static assets directory containing favicons, icons, and web app manifest

### Key Functionality

- **URL Management**: Normalizes URLs, validates paths, manages protocol switching (HTTP/HTTPS)
- **XML Generation**: Creates compliant sitemap XML with proper escaping and lastmod dates
- **SPM Integration**: Calculates coverage statistics based on SPM's 20-URL testing limit
- **File Download**: Generates and downloads XML files as "spm-custom-sitemap.xml"

### Design System

- Uses Inter font for UI and Lora serif for headings
- WP Engine brand colors: #0ECAD4 (teal), #006BD6 (blue), #002447 (dark blue)
- Responsive grid layouts with mobile-first design
- Card-based UI with subtle shadows and hover effects

### Assets Structure

The `/assets/` directory contains:

- **favicon.ico** - Legacy browser support (ICO format)
- **favicon-96x96.png** - Modern browser favicon (PNG format)
- **favicon.svg** - Vector favicon for browsers that support SVG
- **apple-touch-icon.png** - iOS home screen icon (180x180)
- **og-image.png** - Open Graph image for social media sharing
- **site.webmanifest** - Web app manifest for PWA capabilities
- **web-app-manifest-*.png** - PWA icons in various sizes (192x192, 512x512)

### Build System

Uses Parcel v2 for zero-config bundling with automatic browser refresh and production optimization. No additional build tools or frameworks are used - this is intentionally a lightweight vanilla JavaScript solution.
