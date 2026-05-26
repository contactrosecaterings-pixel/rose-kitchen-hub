import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/booking", label: "Book Inquiry" },
] as const;

export function SiteNav() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    links.forEach((link) => {
      void router.preloadRoute({ to: link.to });
    });
  }, [router]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open so iOS rubber-band
  // can't reveal the cream page beneath the white overlay.
  useEffect(() => {
    if (!open) return;
    const { body, documentElement } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverscroll = documentElement.style.overscrollBehavior;
    body.style.overflow = "hidden";
    documentElement.style.overscrollBehavior = "none";
    return () => {
      body.style.overflow = prevBodyOverflow;
      documentElement.style.overscrollBehavior = prevHtmlOverscroll;
    };
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-[60] transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-border/60 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
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
          className="relative z-[10000] flex h-11 w-11 items-center justify-center rounded-full text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          style={{ color: "var(--color-foreground)" }}
        >
          <span className="relative block h-4 w-6">
            <motion.span
              className="absolute left-0 right-0 top-0 block h-[2px] rounded-full"
              style={{ backgroundColor: "currentColor", transformOrigin: "50% 50%" }}
              animate={open ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="absolute left-0 right-0 top-1/2 block h-[2px] -translate-y-1/2 rounded-full"
              style={{ backgroundColor: "currentColor" }}
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="absolute left-0 right-0 bottom-0 block h-[2px] rounded-full"
              style={{ backgroundColor: "currentColor", transformOrigin: "50% 50%" }}
              animate={open ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        </button>
      </div>

      <div
        aria-hidden={!open}
        className={[
          "fixed inset-0 z-[9999] w-screen overflow-hidden bg-white transition-opacity duration-300 ease-out md:hidden",
          open
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none",
        ].join(" ")}
        style={{ height: "100lvh", minHeight: "100dvh", willChange: "opacity" }}
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