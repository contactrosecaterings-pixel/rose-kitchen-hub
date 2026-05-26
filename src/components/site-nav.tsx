import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

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

  // Close menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock page scroll only while the menu is open. Cleanup fully restores
  // body styles so nothing leaks (which is what previously caused the iOS
  // Safari bottom-bar opaque-panel regression).
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Rose <span className="text-primary">Caterings</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links
              .filter((l) => l.to !== "/booking")
              .map((l) => (
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
            className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/*
        Full-screen mobile menu. Only mounted when open — leaving a
        full-viewport fixed element in the DOM causes iOS Safari 26 to
        paint an opaque panel behind the Liquid Glass bottom bar.
      */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 flex flex-col bg-background md:hidden"
          style={{ animation: "rc-menu-fade 200ms ease-out both" }}
        >
          <div aria-hidden className="h-[72px] shrink-0" />
          <nav className="flex-1 overflow-y-auto px-8 pb-16 pt-4">
            {links.map((l) => (
              <div key={l.to} className="border-b border-border/60">
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  onClick={() => setOpen(false)}
                  className="block py-5 font-display text-3xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
                  activeProps={{ className: "text-primary" }}
                >
                  {l.label}
                </Link>
              </div>
            ))}
          </nav>
          <style>{`@keyframes rc-menu-fade { from { opacity: 0 } to { opacity: 1 } }`}</style>
        </div>
      )}
    </>
  );
}