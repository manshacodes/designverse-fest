# DesignVerse — Student Design & Innovation Fest

A landing page for **DesignVerse**, a fictional student design & innovation
fest hosted by the Design & Innovation Society at IGDTUW. Two days of
workshops, talks and a 24-hour build sprint.

The page is built around one idea: the thing you came for is a **pass**, so
the pass is the hero object, the registration form and the payoff all at
once. Everything is milled out of the same dark metal.

**Live site:** _add your deployment link here_

## What's on the page

- **Hero** — the event name scrambles into place, and a machined metal pass
  drops in from the top-right corner. It tilts toward your cursor with a
  specular highlight that tracks the pointer. **Click it and it flips over**
  to reveal the registration form on its back, growing taller as it turns.
  Submitting issues a pass code.
- **Where the two days go** — eight activity plates on an invisible cylinder.
  They deal out one by one on scroll, then the ring opens into a carousel you
  can drag. Scrolling also scrubs it round.
- **Walk the two days** — the schedule as a route map. Sixteen stops from
  Saturday check-in to Sunday wrap. The path draws itself as you scroll while
  a chrome bearing travels along it, and every stop lights up as it's passed.
  Serpentine on wide screens, a straight line on narrow ones.
- **Who's in the room** — speaker cards stacked as a deck, each pivoting off
  its top edge and falling away as you scroll, like a flip chart.
- **Admission** — the practical terms, with a button that flips the same pass
  open rather than duplicating the form.
- A **metal cursor** (a chrome ball bearing trailing the pointer), handwritten
  marker annotations whose arrows draw themselves in, and chrome sparkles,
  printer's crop marks, a registration target and a measuring rule as
  decoration.

## Technologies used

- **React 19 + Vite** — components and build tooling
- **Lenis** — smooth scrolling, driven off the GSAP ticker so ScrollTrigger
  and Lenis agree on scroll position
- **GSAP** — `ScrollTrigger` for the scrubbed carousel and `data-speed`
  parallax, `ScrambleTextPlugin` for the headline
- **Framer Motion** — the ring's motion values and springs, the pass flip,
  the speaker deck, the route map's scroll progress
- Plain CSS with custom properties for the design tokens — no CSS framework
- Fonts self-hosted via Fontsource

## Design decisions

- **Palette**: a near-black ground (`#080808`) with cool silver type
  (`#E1E5E5`), brushed graphite and polished chrome surfaces, and film grain
  over everything. Chrome is built from hard-banded gradients — the banding is
  what reads as metal rather than grey.
- **Type**: Anton for display (tall, heavy, compressed — poster typography),
  Archivo for body, JetBrains Mono for technical labels, pass codes and
  times, and Caveat for the handwritten notes.
- **3D without WebGL**: the pass, the carousel and the deck are all CSS 3D
  transforms. No Three.js.
- `prefers-reduced-motion` is respected throughout — smooth scroll, the
  cursor, the sparkles and the scroll-driven sections all stand down.

## Setup & run

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

Requires Node.js 18+.

## Project structure

```
src/
  components/
    FlipTicket.jsx    the metal pass + registration form on its back
    Highlights.jsx    3D ring carousel
    ScheduleMap.jsx   scroll-drawn route map of the schedule
    Voices.jsx        speaker flip deck
    Admission.jsx     admission terms
    MetalCursor.jsx   chrome cursor
    Annotation.jsx    handwritten notes with drawn-in arrows
    Deco.jsx          sparkles, crop marks, registration mark, rule
  lib/
    reelPose.js       pure function placing each card on the ring
    useSmoothScroll.js  Lenis + ScrollTrigger wiring and data-speed parallax
  index.css           design tokens and global styles
```

## Note

DesignVerse is not a real event. The dates, venue, speakers and quotes are
invented for this brief.
