import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="group flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Rose <span className="text-primary">Caterings</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
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
          className="relative z-[60] rounded-full p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="mobile-menu-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
              className="fixed right-0 top-0 z-50 flex h-[100dvh] w-[78%] max-w-sm flex-col border-l border-border/60 bg-background shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/60">
                <span className="font-display text-xl font-semibold">Menu</span>
                <button
                  aria-label="Close menu"
                  className="rounded-full p-2 text-foreground"
                  onClick={() => setOpen(false)}
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col gap-1 px-6 py-6">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-3 text-base font-medium text-muted-foreground hover:bg-secondary"
                    activeProps={{ className: "text-foreground" }}
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  to="/booking"
                  onClick={() => setOpen(false)}
                  className="mt-4 rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground"
                >
                  Book Inquiry
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}