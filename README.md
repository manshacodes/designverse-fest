# DesignVerse — Student Design & Innovation Fest

A landing page for **DesignVerse**, a fictional student design & innovation
fest, built for IGDTUW's design club. Two days of workshops, talks, and a
live build sprint — this page communicates the event and drives
registration through a few signature interactions rather than generic
hero animations.

**Live site:** _add your deployment link here_

## What's on the page

- **Hero** — event name, date/time/venue as color-coded "signage" tags, and
  an intro paragraph with hoverable inline keywords that reveal a small
  stat card (workshops / speakers / build sprint).
- **Highlights (Event overview & activities)** — eight activity cards sit
  on an invisible 3D ring. On scroll into view they deal out one by one
  (the "loader"), then the ring itself opens into a full drag-to-rotate
  carousel (the "hero") — one scene, two moments, driven by a single pure
  pose function (`src/lib/reelPose.js`).
- **Register** — the registration form, styled as an actual ticket:
  notched edges, a dashed perforation line, and a tear-off submit button.
  Submitting validates the fields and reveals a generated ticket code.
- **Headline scramble-in**, a sticky nav with a mobile menu, and a dark
  footer with event/contact info.

## Technologies used

- **React 19 + Vite** — component structure and dev/build tooling
- **Framer Motion** — the ring carousel's motion values/spring, inline
  keyword hover cards, scroll-reveal
- **GSAP (`ScrambleTextPlugin`)** — the headline's scramble-to-reveal effect
- Plain CSS (custom properties for the design tokens — colors, type,
  spacing — no CSS framework)

## Design decisions

- **Palette**: a neutral stone-paper background with a three-color
  "signal" system (red / amber / blue) used like event wayfinding
  signage — red for registration, amber for schedule/time, blue for
  info/links — rather than a generic dark or gradient theme.
- **Type**: Bricolage Grotesque (display), IBM Plex Sans (body), IBM Plex
  Mono (tags, ticket codes, labels).
- Motion and 3D effects are built with CSS 3D transforms + Framer
  Motion/GSAP — no WebGL/Three.js — to keep the stack explainable and the
  bundle light.

## Setup & run

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

Requires Node.js 18+.

## Project structure

```
src/
  components/   # Nav, Hero, Highlights, Register, Footer, ScrambleText, InfoKeyword
  lib/
    reelPose.js # pure function driving the Highlights ring/carousel
  index.css     # design tokens + global styles
```
