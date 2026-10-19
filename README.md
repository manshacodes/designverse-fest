<div align="center">

# DESIGNVERSE

**A student design & innovation fest — IGDTUW, 14–15 March 2026**

Built for Nirvana, the Design Club of IGDTUW

[**→ View the live site**](https://manshacodes.github.io/designverse-fest/)

`React 19` · `Vite` · `GSAP` · `Framer Motion` · `Lenis`

</div>

---

## The idea

A design fest sells one thing: **a pass through the door.** So the pass isn't
a button at the bottom of the page — it's the hero object, the registration
form, and the payoff, all the same piece of metal.

Everything else follows from that. If the pass is a physical object milled out
of steel, the page should be the material it was cut from: near-black ground,
brushed graphite, polished chrome, film grain over the whole thing. The
typography is poster lettering, not product lettering, because a fest is an
event you put up on a wall.

---

## What's on the page

| Section | What it does |
| --- | --- |
| **Hero** | Event name scrambles into place. A machined metal pass drops in from the top-right, tilts toward your cursor, and the specular highlight tracks the pointer. **Click it and it flips** to reveal the registration form on its back. |
| **Where the two days go** | Eight session plates sitting on an invisible cylinder. They deal out one by one, then the ring opens into a carousel you can drag — and scrolling scrubs it round. Each plate carries a glyph, a description, and when/runs/space details. |
| **Walk the two days** | The schedule as a **route map**. Sixteen stops, Saturday check-in to Sunday wrap. The path draws itself as you scroll while a chrome bearing travels along it, lighting each stop as it passes. |
| **Who's in the room** | Speaker cards stacked as a deck, each pivoting off its top edge and falling away like a page on a flip chart. |
| **Admission** | The practical terms — cost, seats, deadline, what to bring — with a button that flips the same pass open rather than duplicating the form. |
| **Footer** | Dates, venue, organiser, contact and Nirvana's live social links. |

---

## Design system

### Palette

| | Token | Role |
| --- | --- | --- |
| ⬛ `#080808` | `--void` | Ground |
| ⬜ `#E1E5E5` | `--silver` | Primary type |
| 🔘 `#99A2A5` | `--silver-dim` | Secondary type |
| ▪️ `#1C2227` | `--slate` | Raised surfaces |

Chrome and graphite aren't flat colours — they're **hard-banded gradients**.
The banding is what reads as metal; a smooth grey gradient just reads as grey.

### Typography

| Face | Role | Why |
| --- | --- | --- |
| **Anton** | Display | Compressed and heavy. Behaves like gig-poster lettering rather than product UI. |
| **Archivo** | Body | Neutral grotesque that gets out of Anton's way. |
| **JetBrains Mono** | Labels, times, pass codes | Monospace signals *data* — and tabular figures keep the schedule aligned. |
| **Caveat** | Marker annotations | The handwritten notes scrawled over the metal. |

### Visual language

Crop marks, registration targets and a measuring rule — real print-production
marks, not generic ornament — plus four-point chrome sparkles and handwritten
annotations whose arrows draw themselves in on scroll.

---

## Interactions

1. **Flip-to-register** — the pass turns on its Y axis and grows to fit the form; submitting issues a pass code.
2. **Draggable 3D carousel** — grab and spin the ring of session plates.
3. **Scroll-driven route map** — the path draws and the marker travels as you scroll.
4. **Speaker flip deck** — scroll-scrubbed card stack.
5. **Responsive nav** — collapses to a menu under 820px.

---

## Built with

| Tool | Used for |
| --- | --- |
| **React 19 + Vite** | Components and build tooling |
| **Lenis** | Smooth scrolling, run off the GSAP ticker so ScrollTrigger and Lenis agree on scroll position |
| **GSAP** | `ScrollTrigger` for the scrubbed carousel and `data-speed` parallax; `ScrambleTextPlugin` for the headline |
| **Framer Motion** | Motion values and springs for the ring, the pass flip, the deck and the route map |
| **Fontsource** | Self-hosted fonts — no render-blocking request to Google |

No CSS framework. No WebGL — every 3D surface is a CSS 3D transform.

---

## Running it locally

```bash
git clone https://github.com/manshacodes/designverse-fest.git
cd designverse-fest
npm install
npm run dev
```

Then open **http://localhost:5173**.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |

Requires **Node.js 18+**. Deployment is automatic — every push to `main`
builds and publishes to GitHub Pages.

---

## Structure

```
src/
├─ components/
│  ├─ FlipTicket.jsx     the metal pass + registration form on its back
│  ├─ Highlights.jsx     3D ring carousel of sessions
│  ├─ ScheduleMap.jsx    scroll-drawn route map of the schedule
│  ├─ Voices.jsx         speaker flip deck
│  ├─ Admission.jsx      admission terms
│  ├─ MetalCursor.jsx    chrome cursor that trails the pointer
│  ├─ Annotation.jsx     handwritten notes with drawn-in arrows
│  └─ Deco.jsx           sparkles, crop marks, registration mark, rule
├─ lib/
│  ├─ reelPose.js        pure function placing each card on the ring
│  └─ useSmoothScroll.js Lenis + ScrollTrigger wiring, data-speed parallax
└─ index.css             design tokens and global styles
```

---

## Accessibility & responsiveness

- Tested at **375px** and **1440px**; the carousel, route map and nav each
  restructure rather than just shrink.
- **`prefers-reduced-motion`** is honoured throughout — smooth scroll, the
  custom cursor, the sparkles and every scroll-driven section stand down.
- The custom cursor only engages on fine-pointer devices.
- Form fields are labelled, the flip is keyboard-reachable, and focus states
  are visible.

---

<div align="center">

DesignVerse is a fictional event created for this brief.
Dates, venue, speakers and quotes are invented.

</div>
