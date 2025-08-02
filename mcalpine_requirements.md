# McAlpine House Website Requirements

## Project Overview
Create a premium architecture/interior design portfolio website inspired by McAlpine House with sophisticated animations, slideshow navigation, and elegant visual design.

## Core Architecture

### Navigation System
- **Slideshow Format**: Single-page application with slide-based navigation
- **Top Navigation Bar**: 
  - Logo (MC) in top-left corner
  - Hamburger menu icon in top-right
  - Central navigation with "Previous" and "Next" buttons
  - Progress indicator showing current section (e.g., "Wellness")
  - Dropdown for section selection
- **Keyboard Navigation**: Arrow keys for Previous/Next
- **URL Routing**: Each slide should have its own URL path

### Page Structure
```
/portal (landing page)
/wellness 
/architecture
/interiors
/about
/contact
```

## Visual Design Requirements

### Typography
- **Primary Font**: Elegant serif font (similar to Playfair Display or Crimson Text)
- **Headings**: Large, sophisticated serif typography
- **Body Text**: Clean, readable sans-serif for descriptions
- **Font Sizes**: Responsive scaling, large impact headings

### Color Palette
- **Primary**: Off-white/cream backgrounds (#FEFEFE, #F8F6F3)
- **Secondary**: Warm grays and natural stone tones
- **Accent**: Deep charcoal for text (#2C2C2C)
- **Subtle**: Light grays for UI elements

### Layout Principles
- **Minimalist**: Abundant white space
- **Centered Content**: Most elements centered with generous margins
- **Image-Driven**: Large, high-quality photography as focal points
- **Grid System**: Clean, architectural grid layout

## Animation Requirements

### Core Animations
1. **Parallax Scrolling**: Background images move at different speeds than foreground content
2. **Fade Transitions**: Smooth opacity changes between sections
3. **Slide Transitions**: Horizontal sliding between portfolio sections
4. **Image Reveals**: Progressive image loading with elegant reveals
5. **Text Animations**: Subtle text fade-ins and slide-ups

### Micro-Interactions
- **Button Hovers**: Subtle scaling and opacity changes
- **Image Hovers**: Gentle zoom or overlay effects
- **Navigation Hovers**: Smooth color transitions
- **Scroll Indicators**: Animated progress bars

### Performance Requirements
- **Smooth Animations**: Focus on visual smoothness over optimization
- **Desktop-First**: Optimize for desktop viewing experience (1200px+ screens)

## Component Structure

### Landing Page (/portal)
```
Header (Logo + Navigation)
Hero Section
  - "Next Project" text
  - Large "Portal" heading with decorative lines
  - "Keep Scrolling" prompt
Footer
```

### Project Pages (e.g., /wellness)
```
Header (Logo + Navigation)
Hero Image Section
  - Full-width background image
  - Parallax scrolling effect
Gallery Sections
  - Multiple image layouts (single, dual, grid)
  - Text overlays with project descriptions
Project Description
  - Centered text block with project details
Navigation Footer
  - Previous/Next project links
```

## Technical Implementation

### Frontend Stack
- **Framework**: React with Next.js
- **Styling**: Tailwind CSS + Custom CSS for animations
- **Animations**: Framer Motion for complex animations
- **Image Optimization**: Next.js Image component
- **Routing**: Next.js App Router

### Animation Libraries
```bash
npm install framer-motion
npm install react-intersection-observer
npm install lenis # for smooth scrolling
```

### Key Hooks and APIs
- `useInView` for scroll-triggered animations
- `useScroll` for parallax effects
- `useMotionValue` for custom animation values
- Intersection Observer for performance

## Content Structure

### Project Data Schema
```javascript
{
  id: "wellness",
  title: "Wellness",
  description: "An English-country inspired compound, nestled into the California hills, with family wellness at its core.",
  heroImage: "wellness-hero.jpg",
  gallery: [
    {
      type: "single", // single, dual, grid
      images: ["wellness-1.jpg"],
      caption: "Optional caption"
    }
  ],
  nextProject: "architecture",
  prevProject: "portal"
}
```

## Image Requirements

### Technical Specs
- **Format**: High-quality JPG/PNG (optimization later)
- **Size**: Desktop-optimized (1600px+ width)
- **Quality**: Prioritize visual quality over file size

### Content Guidelines
- **Hero Images**: 1920x1080 minimum, landscape orientation
- **Gallery Images**: Mixed orientations, professional architectural photography
- **Image Style**: Natural lighting, neutral tones, high contrast

## Performance Targets

*Note: Performance optimization will be handled in later phases - focus on functionality first*

## Responsive Design

*Note: Mobile responsiveness will be addressed later - focus on desktop experience (1200px+ viewports)*

## Accessibility Requirements

### WCAG 2.1 Compliance
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Minimum 4.5:1 contrast ratio
- **Reduced Motion**: Respect `prefers-reduced-motion`

### Implementation Details
- Focus management for slideshow navigation
- Alt text for all images
- Proper heading hierarchy (h1, h2, h3...)
- Skip links for main content

## Development Phases

### Phase 1: Core Structure (Priority)
1. Set up Next.js project with Tailwind
2. Create basic routing and navigation
3. Implement slideshow architecture
4. Build desktop layout system

### Phase 2: Content & Styling (Priority)
1. Add project content and images
2. Implement typography system
3. Create desktop grid layouts
4. Style navigation components

### Phase 3: Animations (Priority)
1. Add Framer Motion setup
2. Implement parallax scrolling
3. Create slide transitions
4. Add micro-interactions

### Phase 4: Polish & Enhancement (Later)
1. Performance optimization
2. Mobile responsiveness
3. Accessibility improvements
4. Cross-browser testing

## File Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (portal)
│   ├── wellness/
│   │   └── page.tsx
│   └── globals.css
├── components/
│   ├── Navigation.tsx
│   ├── ProjectSlide.tsx
│   ├── ImageGallery.tsx
│   └── ParallaxSection.tsx
├── data/
│   └── projects.json
├── hooks/
│   ├── useParallax.ts
│   └── useSlideshow.ts
└── public/
    └── images/
```

## Success Criteria

### User Experience
- Smooth, lag-free animations across all devices
- Intuitive navigation that feels natural
- Fast loading times with progressive enhancement
- Professional, premium aesthetic that matches reference

### Technical
- **Desktop Experience**: Smooth, premium feel on desktop browsers
- **Animation Quality**: Prioritize visual impact over performance metrics
- **Core Functionality**: All slideshow and navigation features working
- **Visual Polish**: Professional aesthetic matching the reference design

## Notes for Claude Code

1. **Start Simple**: Begin with basic slideshow functionality before adding complex animations
2. **Progressive Enhancement**: Build core experience first, then layer on animations
3. **Component-First**: Create reusable components for gallery layouts
4. **Performance Focus**: Monitor animation performance from the beginning
5. **Placeholder Content**: Use placeholder images initially, replace with actual content later
6. **Animation Library**: Prefer Framer Motion for complex animations over CSS-only solutions
7. **Testing Strategy**: Test animations on various devices and connection speeds