
# Rose Caterings — Build Plan

A premium, responsive multi-page catering site with a booking intake flow, Supabase-backed storage, automated email alerts, and a protected admin dashboard.

## Design System

- Palette: deep gold (#B8860B / refined oklch), rich cream (#FAF6EC), charcoal (#1F1B16), soft accent.
- Typography: Playfair Display (headings) + Inter (body), loaded via Google Fonts in `__root.tsx`.
- Tokens defined in `src/styles.css` (oklch). Custom button variants (gold primary, outline cream).
- Subtle motion (fade/slide-in on scroll) via framer-motion. Generous whitespace, elegant dividers.

## Pages & Routes

```
src/routes/
  __root.tsx            (Nav + Footer shell, fonts, providers)
  index.tsx             Home
  menu.tsx              Menu
  about.tsx             About
  booking.tsx           Booking intake (multi-step)
  contact.tsx           Contact
  login.tsx             Admin login
  _authenticated.tsx    Auth guard layout
  _authenticated/admin.tsx   Admin dashboard
  api/public/booking-notify.ts  (internal — triggered from server fn)
```

Each route gets its own `head()` metadata (title, description, og tags).

### Home
Hero with headline, sub-copy, "Book a Catering Inquiry" CTA → `/booking`. Service-area strip (Paris, Brantford, GTA). "Our Specialty" 3-card grid (Shank Nihari, Biryani, Behari Boti) with AI-generated dish photography.

### Menu
Cards grouped by category (Main Course subsections, Sides & Sweets). Prominent banner: "All items can be customized upon request. Contact us for a custom quote." No prices anywhere.

### About
Narrative section on heritage Pakistani home-cooking, slow-cooked traditions, spice blends, event types (weddings, aqeeqahs, Eid, corporate, milestones).

### Booking (multi-step)
4 steps with progress indicator:
1. Contact Info — name, email, phone
2. Event Details — date (calendar picker), guest count, event type
3. Logistics & Food — service type, preferred dishes (multi-select from menu), allergies/notes
4. Follow-up — preferred call time
Submit → success state replaces form: "Thank you for your request! …call within 24–48 hours…"
Validated with Zod. React Hook Form. Shadcn components.

### Contact
Phone, email, service-area block.

### Admin (`/admin`, protected)
- Supabase Auth email/password login at `/login`.
- `_authenticated` layout guards subtree.
- Table: newest first, status badges (yellow Pending Phone Call / green Confirmed / red Cancelled), "Mark as Confirmed" action, search by name/phone.

## Backend (Lovable Cloud / Supabase)

### Schema (migration)
```
bookings (
  id uuid pk default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  event_date date not null,
  guest_count text not null,
  event_type text not null,
  service_type text not null,
  preferred_dishes text[] not null default '{}',
  allergies text,
  preferred_call_time text not null,
  status text not null default 'Pending Phone Call',
  created_at timestamptz not null default now()
)
```

RLS enabled.
- Anonymous INSERT allowed (public booking form).
- SELECT/UPDATE restricted to admins via `user_roles` table + `has_role()` security-definer function (per app_role enum).

### User roles
Separate `user_roles` table + `app_role` enum (`admin`, `user`) + `has_role(uuid, app_role)` security-definer function. Admin user seeded after Cloud is enabled.

### Server functions
- `submitBooking` (public, no auth) — validates with Zod, inserts row via `supabaseAdmin`, enqueues notification email, returns `{ ok: true }`.
- `listBookings` / `updateBookingStatus` — protected with `requireSupabaseAuth` + admin role check.

### Email notification (Lovable App Emails)
- Enable email infra (prereq: email domain setup dialog will be shown first).
- React Email template `new-booking-alert.tsx` with subject `🚨 New Catering Request from {name}`.
- Body lists Name, Phone, Event Date, Guest Count, Preferred Call Time.
- Sent to `contact.rosecaterings@gmail.com` from `submitBooking` via the `send-transactional-email` queue.

## Implementation Steps

1. Enable Lovable Cloud.
2. Create migration: `app_role` enum, `user_roles`, `has_role()`, `bookings` table + RLS policies.
3. Configure Supabase Auth (email/password); seed admin role for the owner's account after first signup.
4. Set up email domain (will prompt user via setup dialog) → run email infra setup → scaffold transactional emails → create `new-booking-alert` template.
5. Build design tokens in `src/styles.css`; add fonts + nav/footer in `__root.tsx`.
6. Build pages: Home, Menu, About, Contact.
7. Build multi-step Booking form + `submitBooking` server fn + success state.
8. Build `/login`, `_authenticated` guard, `/admin` dashboard (table, badges, search, status update action).
9. Generate hero + 3 dish images.
10. SEO metadata per route.

## Open Questions

None blocking — defaults are reasonable. One note: I will use the placeholder phone `(123) 456-7890` and the provided email exactly as given. The admin account will need to be created by signing up at `/login` once the site is live, after which I'll grant the admin role via a one-time SQL insert.
