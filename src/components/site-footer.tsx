import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3 lg:px-10">
        <div>
          <p className="font-display text-2xl text-foreground">
            Rose <span className="text-primary">Caterings</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Authentic, heritage Pakistani home-cooked catering for weddings, family
            gatherings, and milestone celebrations.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Service Area
          </p>
          <p className="mt-3 text-sm text-foreground">
            Greater Toronto Area (GTA)
            <span className="mx-2 text-muted-foreground">|</span>
            Brant County &amp; Surroundings
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Contact
          </p>
          <p className="mt-3 text-sm text-foreground">(437) 410-1212</p>
          <a
            href="mailto:contact.rosecaterings@gmail.com"
            className="block text-sm text-foreground hover:text-primary"
          >
            contact.rosecaterings@gmail.com
          </a>
          <Link
            to="/booking"
            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
          >
            Book a catering inquiry →
          </Link>
        </div>
      </div>
      <div className="border-t border-border/60 py-5">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Rose Caterings. All rights reserved.
        </p>
      </div>
    </footer>
  );
}