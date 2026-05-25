import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/booking", label: "Book Inquiry" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-[60] border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="group flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Rose <span className="text-primary">Caterings</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.filter((l) => l.to !== "/booking").map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="relative text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground transition-all duration-200 hover:scale-[1.06] hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/booking"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-300 hover:scale-[1.05] hover:shadow-md hover:brightness-105"
          >
            Book Inquiry
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="relative z-[10000] flex h-11 w-11 translate-z-0 items-center justify-center rounded-full text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          style={{ color: open ? "oklch(0.22 0.02 60)" : "var(--color-foreground)", opacity: 1, visibility: "visible", willChange: "transform" }}
        >
          <span className="relative block h-4 w-6 opacity-100" style={{ transform: "translate3d(0,0,0)" }}>
            <span
              className="absolute left-0 right-0 block h-[2px] rounded-full transition-transform duration-300 ease-out"
              style={{
                backgroundColor: "currentColor",
                top: open ? "50%" : 0,
                transform: open ? "translateY(-50%) rotate(45deg)" : "translateY(0) rotate(0)",
              }}
            />
            <span
              className="absolute left-0 right-0 block h-[2px] rounded-full transition-opacity duration-200 ease-out"
              style={{ backgroundColor: "currentColor", top: "50%", transform: "translateY(-50%)", opacity: open ? 0 : 1 }}
            />
            <span
              className="absolute left-0 right-0 block h-[2px] rounded-full transition-transform duration-300 ease-out"
              style={{
                backgroundColor: "currentColor",
                bottom: open ? "50%" : 0,
                transform: open ? "translateY(50%) rotate(-45deg)" : "translateY(0) rotate(0)",
              }}
            />
          </span>
        </button>
      </div>

      <div
        aria-hidden={!open}
        className={[
          "fixed inset-x-0 top-0 z-[9999] h-screen overflow-hidden bg-white transition-all duration-300 ease-out md:hidden",
          open
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none",
        ].join(" ")}
        style={{ willChange: "opacity", transform: "translate3d(0,0,0)" }}
      >
        <nav className="flex h-full flex-col gap-2 px-8 pb-12 pt-28">
          {links.map((l) => (
            <div key={l.to} className="border-b border-neutral-200">
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                onClick={() => setOpen(false)}
                className="block py-5 font-display text-3xl font-semibold tracking-tight text-neutral-900 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}