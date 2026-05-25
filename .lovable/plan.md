## 1. Booking form (`src/routes/booking.tsx` + `src/lib/bookings.functions.ts`)

**Guest count → numeric input**
- Replace the `<PillGroup>` for guest count with `<Input type="number" min={10} max={100} placeholder="Minimum 10 guests">`.
- `FormState.guest_count` becomes `number | "" ` (empty string for unset).
- `canAdvance()` step 1 checks `typeof guest_count === "number" && guest_count >= 10 && guest_count <= 100`.
- Zod `BookingSchema.guest_count`: `z.number().int().min(10).max(100)`.
- Handler converts the number to a string before inserting (DB column is `text`) — e.g. `String(data.guest_count)` — and the emailed body shows `"<n> guests"`.

**Call time slots**
- Options become: `"Morning (9 AM – 12 PM)"`, `"Afternoon (12 PM – 5 PM)"`, `"Evening (5 PM – 8 PM)"`.
- `FormState.preferred_call_time` union + `BookingSchema.preferred_call_time` Zod enum updated to match exactly.

## 2. Animations

**Homepage images** (`src/routes/index.tsx`)
- Wrap hero/specialty images so they animate only `opacity`, `scale`, and `translate3d` (GPU-friendly). Set explicit `width`/`height` and reserved aspect-ratio containers so the image swap from blank → loaded doesn't reflow.
- Use `onLoad` to drive a `motion.img` from `{opacity:0, scale:1.02}` → `{opacity:1, scale:1}` with a soft easing curve. Hero image starts the animation immediately on mount, specialty cards use `whileInView`.
- Remove the existing layout-affecting `y` transform on the `<img>` itself (keep `y` only on text/cards, not images).

**Menu page text cycler** (`src/routes/menu.tsx`)
- Headline becomes `"A taste of "` + animated word.
- Cycle through `["home", "culture", "tradition", "Pakistan"]` every ~2.4s.
- Implement with Framer Motion `AnimatePresence` + `motion.span` (absolutely positioned inside a relatively-positioned inline-flex container whose width animates via `layout` so the surrounding text shifts smoothly).
- Word transitions: enter from `y: 18, opacity: 0` → `y: 0, opacity: 1`; exit to `y: -18, opacity: 0`.

## 3. Menu data (`src/lib/menu-data.ts`)

Replace contents with:

- **Main Course → Karahi & Nihari Dishes**: `Chicken Karhai`, `Chicken Nihari`, `Lamb Shank Nihari`
- **Main Course → Rice Dishes**: `Chicken Biryani`, `Chicken Pulao`, `Lamb Shank Pulao` (only one biryani — Chicken)
- Other Main Course sections unchanged (Traditional Curries, BBQ & Grilled, Keema Specials)
- **Sides & Sweets → Sauces**: `Raita`, `Chutney`, `Hummus`
- **New section under Sides & Sweets → Appetizers**: `Samosas (Chicken, Beef, or Potato)` — single item string so existing pill/list mapping keeps working; the parenthetical renders inline within the grid card.
- **Sides & Sweets → Desserts**: `Kheer`, `Kulfi` (Gulab Jamun removed)

`ALL_DISHES` export auto-updates via existing flatMap.

## 4. Service area copy (`src/routes/index.tsx`)

Replace the single line `Paris · Brantford · Greater Toronto Area` with two equally-weighted lines (or a two-column flex on sm+):

```
Greater Toronto Area (GTA)     Brant County & Surroundings
```

Both rendered with identical typography so neither dominates.

## Type-safety audit

- `FormState` updated in-place (no separate `src/types/form.ts` exists — booking.tsx owns the type).
- Server `BookingSchema` updated in lockstep so the `submit({ data })` call site stays type-checked end-to-end.
- DB column `bookings.guest_count` remains `text` (no migration needed); the server function stringifies the number before insert.
- Menu changes don't touch any types — `MenuCategory` shape is preserved.

No new packages, no DB migration, no auth changes.