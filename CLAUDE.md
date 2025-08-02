# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a speculative design capstone project called "Terraformers of the Post-Human Loop" - an interactive academic presentation website exploring post-human planetary ecosystems and robot-driven settlements. The project is part of Columbia GSAPP's Computational Design Practices program (Summer 2025).

## Architecture & Structure

### File Organization
- `index.html` - Main interactive presentation with navigation and content sections
- `script.js` - JavaScript functionality for navigation, particles, and D3.js network visualization
- `style.css` - Comprehensive styling with animations and responsive design
- `terraformers_website.html` - Alternative version with inline styles
- `README.md` - Basic project documentation
- `LICENSE` - MIT License

### Key Components

**Interactive Navigation System:**
- Multi-section presentation (Research, Methods, Design, Materials, Community)
- JavaScript-powered section switching via `showSection()` function (script.js:30)
- Active state management for navigation items

**Visual Effects:**
- Animated particle system using procedural generation (script.js:2)
- CSS animations including "breathing" effect at 4.7s intervals (style.css:271)
- Glowing text effects and responsive design patterns

**Data Visualization:**
- D3.js network graph showing project relationships (script.js:64)
- Force-directed layout with drag interaction
- Color-coded node types and interactive legend

**Responsive Design:**
- CSS Grid layouts for content organization
- Mobile-first approach with breakpoints at 768px
- Flexible typography using clamp() functions

## Development Commands

This is a static HTML/CSS/JavaScript project with no build system or dependencies beyond D3.js (loaded via CDN).

**Local Development:**
```bash
# Serve files locally (any method)
python -m http.server 8000
# or
npx serve .
# or open index.html directly in browser
```

**File Watching:**
No build process required - changes to HTML/CSS/JS files are immediately visible on refresh.

## Design System

**Color Palette:**
- Primary: `#00ff88` (cyan-green, used for UI elements and text)
- Accent: `#66ffaa` (lighter green for subtitles)
- Background: Dark gradient (`#0a0a0a` to `#16213e`)
- Interactive elements use rgba variations with opacity

**Typography:**
- Monospace font stack: `'Courier New', monospace`
- Responsive sizing with `clamp()` functions
- Letter-spacing for uppercase navigation items

**Layout Patterns:**
- Side panel navigation (180px fixed width)
- Main content with max-width 1200px
- CSS Grid for card-based content sections
- Glassmorphism effects using backdrop-filter

## Content Structure

The project explores speculative planetary urbanism through five main sections:
1. **Research** - Core questions about post-human ecosystems
2. **Methods** - Computational design approaches and data sources
3. **Design** - Tools, theory, and visual representation strategies
4. **Materials** - Physical artifacts and material gestures
5. **Community** - Context, lineage, and theoretical positioning

## Technical Notes

- D3.js v7 integration for network visualization
- CSS custom properties could be implemented for better maintainability
- No package.json or build dependencies
- Git repository with clean commit history

## Academic Context

This is a Columbia GSAPP capstone project focusing on:
- Planetary-scale computational design
- Post-anthropocentric design theory
- Speculative futures and critical technoscience
- Bio-mimicry and cyborg ecosystems
- Data-driven terrain generation from extraterrestrial datasets