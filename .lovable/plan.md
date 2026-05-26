Make the email value bulletproof across every viewport (320px ultra-narrow phones → 4K desktop) with zero overflow and zero awkward wrapping.

## Strategy

Use a fluid `clamp()` font size that scales smoothly with viewport width, combined with proper word-breaking rules so the email can wrap as a last resort on extremely narrow screens but stays on one line everywhere it fits.

## Change (single edit in `src/routes/contact.tsx`)

On the email `<p>` element only:

1. **Replace** the static `text-xl` + `lg:[font-size:clamp(0.72rem,1.45vw,1.15rem)]` with a single unified fluid clamp that covers all breakpoints:
   - `[font-size:clamp(0.875rem,3.6vw,1.25rem)]`
   - At 320px → ~0.875rem (14px) — fits `contact.rosecaterings@gmail.com` (29 chars) within card padding
   - At 393px (current device) → ~0.95rem — comfortable, single line
   - At 768px tablet → ~1.15rem
   - At 1024px+ desktop → caps at 1.25rem
2. **Keep** `break-words` and add `[overflow-wrap:anywhere]` as a safety net so even on a hypothetical 280px device the email breaks cleanly inside the card rather than overflowing.
3. **Keep** `lg:whitespace-nowrap` so on desktop rows it never wraps.
4. **Keep** all other elements (phone, service area, desktop layout, mobile card structure) exactly as they are.

## Why this guarantees no issues

- `clamp()` with a `vw` middle term means the size is mathematically tied to viewport width — there is no breakpoint gap where it can suddenly overflow.
- `overflow-wrap: anywhere` is the modern CSS rule that lets long unbreakable strings (like emails) break at any character only when needed, preventing horizontal overflow on any device.
- The desktop row keeps `whitespace-nowrap` + its own clamp, which we've already validated fits at all `lg+` widths.

## Verification

After the edit, visually confirm at three viewport widths (320, 393, 768, 1280) that the email renders on one line within the card and never spills past the card edge.