## Goal

Refresh homepage reviews + animations, fix menu page badge/typewriter, and add a new Chicken Biryani specialty image. Service area copy is already consistent — verify only.

## 1. New Chicken Biryani image

- Generate a fresh, high-appeal Chicken Biryani photo with `imagegen` (premium tier) → save to `src/assets/dish-biryani-fresh.jpg`.
- Swap the import in `src/routes/index.tsx` so the Biryani specialty card uses the new asset. Leave Nihari/Behari untouched.

## 2. Reviews section redesign (`src/routes/index.tsx`)

- Replace the rigid 3-up card grid with a warmer layout:
  - Wrap the section in an ivory/cream panel (`bg-[oklch(...)]` warm tone, defined alongside existing tokens) with soft layered shadows and `rounded-3xl` cards.
  - Slight vertical offset / asymmetric alignment (middle card nudged down) so it doesn't read as a uniform grid.
  - Use a quotation glyph, star row, italic quote, then name + role.
- Generate 3 unique catering-themed images (family hands at a table, buffet spread, hot platter close-up) via `imagegen` → save under `src/assets/review-*.jpg`. No reuse of dish images.
- Keep 5 gold stars, but vary card composition (one image-top, one image-side, one image-bottom) to avoid corporate uniformity while staying responsive.

## 3. Menu page badge + typewriter (`src/routes/menu.tsx`)

- Remove the `100% Halal` pill from below the heading; place a new subtitle badge ABOVE the heading:  
`[✨ 100% HALAL]` — small, uppercase, letter-spaced, centered, subtle border.
- Rebuild typewriter from scratch:
  - Reserve stable width via a hidden sizer span containing the longest word ("tradition") so the line never reflows.
  - Cleaner state machine using a single `useEffect` with proper cleanup; cycle home → culture → tradition → Pakistan.
  - Keep blinking caret, but use `inline-block` with fixed line-height to prevent baseline jumps.

## 4. Homepage animations rebuild (`src/routes/index.tsx`)

- Delete current `onLoad` + inline-style fade logic (`SpecialtyImage`, hero `heroLoaded`).
- New pipeline with Framer Motion:
  - Each image wrapped in an aspect-ratio container with a solid `bg-secondary` skeleton placeholder.
  - Use `motion.img` with `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}` triggered by an `onLoad` → `setLoaded(true)` boolean, `transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}`. No transform-from-scale mid-flight (root cause of the blink).
  - Add `decoding="async"` + `fetchPriority` ("high" for hero, "low" for below-fold).
- Scroll parallax:
  - Hero image: `useScroll` + `useTransform` → translateY range (e.g. 0 → -60px) tied to page scroll.
  - Specialty cards: subtle `whileInView` y-translation (already present) refined with a small `useScroll`/`useTransform` on each image for gentle parallax inside its container.
- All transforms use `translate3d` via Framer Motion's `style={{ y }}` for GPU acceleration; add `will-change-transform` class.

## 5. Service area copy

- Already consistent across hero, footer, contact, and root meta tags ("Greater Toronto Area (GTA) | Brant County & Surroundings"). About route has no service-area copy. No edits needed — just verify after build.

## Technical notes

- No DB, no server function, no new packages (framer-motion already used).
- New assets: `dish-biryani-fresh.jpg`, `review-family.jpg`, `review-buffet.jpg`, `review-platter.jpg` in `src/assets/`.
- All color additions go through `src/styles.css` tokens (warm ivory panel token) — no raw hex in components.