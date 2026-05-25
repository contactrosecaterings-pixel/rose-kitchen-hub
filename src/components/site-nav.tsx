import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";

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
          className={`relative z-[10000] flex h-10 w-10 items-center justify-center rounded-full md:hidden ${open ? "text-neutral-900" : "text-foreground"}`}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <motion.span
              className="absolute left-0 right-0 block h-[2px] rounded-full bg-current"
              animate={open ? { top: "50%", y: "-50%", rotate: 45 } : { top: 0, y: 0, rotate: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute left-0 right-0 block h-[2px] rounded-full bg-current"
              animate={open ? { opacity: 0 } : { opacity: 1, top: "50%", y: "-50%" }}
              initial={false}
              style={{ top: "50%", y: "-50%" }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute left-0 right-0 block h-[2px] rounded-full bg-current"
              animate={open ? { bottom: "50%", y: "50%", rotate: -45 } : { bottom: 0, y: 0, rotate: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>
        </button>
      </div>

      <div
        aria-hidden={!open}
        className="fixed inset-x-0 top-0 z-[9999] h-screen overflow-hidden bg-white md:hidden"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 360ms cubic-bezier(0.16, 1, 0.3, 1), visibility 360ms",
          willChange: "opacity, transform",
          transform: "translate3d(0,0,0)",
        }}
      >
        <motion.nav
          initial={false}
          animate={open ? "open" : "closed"}
          variants={{
            open: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
            closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
          }}
          className="flex h-full flex-col gap-2 px-8 pb-12 pt-28"
        >
          {links.map((l) => (
            <motion.div
              key={l.to}
              variants={{
                open: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                closed: { opacity: 0, y: -16, transition: { duration: 0.2 } },
              }}
              style={{ willChange: "transform, opacity" }}
              className="border-b border-neutral-200"
            >
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                onClick={() => setOpen(false)}
                className="block py-5 font-display text-3xl font-semibold tracking-tight text-neutral-900 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </div>
    </header>
  );
}