## Fixes

### 1. Hero banner — stable height on iOS Safari
File: `src/routes/index.tsx`
- Replace `min-h-[100dvh]` on the hero `<section>` with a stable height pinned on initial viewport. Use `min-h-svh` (small viewport, stable — doesn't change as the URL bar collapses) instead of `dvh` (dynamic, recalculates on every scroll causing the hiccup). On `lg:` keep current `lg:min-h-0`.
- Result: banner no longer resizes as iOS Safari's bottom bar expands/contracts.

### 2. Mobile menu overlay — full-bleed, no cream strips
File: `src/components/site-nav.tsx`
- Change overlay container from `fixed inset-x-0 top-0 h-screen` to `fixed inset-0 w-screen min-h-[100svh]` with `min-height: 100svh` and additional `height: 100dvh` fallback via inline style picking the larger — actually use `min-h-svh` plus `h-dvh` set to `max(100svh,100dvh)` via inline style `minHeight: '100lvh'` (large viewport — covers when bars are hidden) so it always covers the absolute screen area regardless of browser chrome state.
- Add `bg-white` on `<html>`/`<body>` background via a small body class toggle when menu is open (or set `overscroll-behavior: none` + `overflow: hidden` on body) so bounce/rubber-band on iOS doesn't reveal the cream page beneath.

### 3. Regression: solid bar behind iOS status/nav area
File: `src/components/site-nav.tsx`
- The `<header>` currently uses `sticky top-0 ... bg-background/85 backdrop-blur-md`. On the latest builds this creates the visible band the user reports. Remove the always-on tinted background; render the header background only after a tiny scroll threshold (or use transparent background with `bg-background/0` at top and transition to `bg-background/85` after scrollY > 4). Keep desktop behavior intact.

### 4. Hamburger ↔ X — smooth morph
File: `src/components/site-nav.tsx`
- Rebuild the icon with framer-motion. Three `motion.span` bars driven by a single `animate` prop based on `open`:
  - Top bar: `y: 0 → 7`, `rotate: 0 → 45`
  - Middle bar: `opacity: 1 → 0`, `scaleX: 1 → 0`
  - Bottom bar: `y: 0 → -7`, `rotate: 0 → -45`
- Single shared `transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}` so both directions feel continuous; remove the current CSS `transition-transform`/`transition-opacity` hand-rolled spans that snap.

### 5. Contact cards — centering + interactive text
File: `src/routes/contact.tsx`
- Container: change `mx-auto mt-14 grid w-full max-w-xl gap-6 md:max-w-none md:grid-cols-3` to use balanced horizontal padding (`px-4 sm:px-6` already on the outer wrapper, but the grid itself currently uses `max-w-xl` which combined with parent `max-w-5xl px-4` produces uneven gutters on small screens). Refactor outer wrapper to `mx-auto w-full max-w-5xl px-6` (symmetric) and grid to `mx-auto grid w-full gap-6 md:grid-cols-3` so cards center perfectly.
- Phone and email are already `<a href="tel:…">` / `mailto:` — good. Add premium hover: `transition-colors group-hover:text-accent` on the phone/email value text, and a subtle underline-on-hover. Make the accent color shift smooth (`duration-300`).

### 6. Softer, slower scroll-in animations
Files: `src/routes/index.tsx`, `src/routes/about.tsx`, `src/routes/menu.tsx`, `src/routes/booking.tsx`, `src/routes/contact.tsx`, `src/routes/__root.tsx`
- Standardize entry transition to `{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }` (was ~0.6–0.7 with `[0.22, 1, 0.36, 1]`).
- Increase `staggerChildren` from `0.12–0.15` to `0.18`, and `viewport={{ once: true, margin: "-80px" }}` → `margin: "-40px"` so they trigger slightly later and fade in more gracefully.
- Apply to `whileInView` motion blocks in specialty cards, reviews, and the root page-transition wrapper.

## Technical notes
- No new dependencies; framer-motion already present.
- No business logic changes; CSS / motion config only.
- Remove the stray `// Sync Update` line at the end of `index.tsx` as part of cleanup.
- Verify after edits that JSX tags balance and no duplicate imports.
