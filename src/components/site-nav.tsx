import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/booking", label: "Book Inquiry" },
] as const;

export function SiteNav() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    links.forEach((link) => {
      void router.preloadRoute({ to: link.to });
    });
  }, [router]);

  // Close whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll only while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`sticky top-0 z-[120] border-b bg-background/85 backdrop-blur-md transition-colors ${open ? "border-transparent" : "border-border/60"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/" className="flex items-center gap-2">
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
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative z-[110] flex h-11 w-11 items-center justify-center rounded-full text-foreground md:hidden"
          >
            <span className="relative block h-[14px] w-6">
              <span
                className={`absolute left-0 right-0 top-0 block h-[2px] rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 right-0 top-1/2 block h-[2px] -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 right-0 block h-[2px] rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/*
        Fullscreen mobile menu. Always mounted to keep transitions reliable,
        but `pointer-events-none` + `opacity-0` + `invisible` when closed so
        it has zero visual or interaction footprint and iOS Safari does not
        treat it as a layout-affecting overlay.
      */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-0 z-[100] md:hidden bg-background transition-opacity duration-300 ease-out ${
          open ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex h-full flex-col items-start justify-center gap-2 px-8 pt-20">
          {links.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              onClick={() => setOpen(false)}
              className="block py-4 font-display text-4xl font-semibold tracking-tight text-foreground transition-all duration-500 hover:text-primary"
              activeProps={{ className: "text-primary" }}
              style={{
                transitionDelay: open ? `${100 + i * 60}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(16px)",
                opacity: open ? 1 : 0,
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}