import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const panelVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 280, damping: 30 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { type: "spring", stiffness: 280, damping: 30 },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.25, ease: "easeIn" } },
};

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

        <motion.button
          aria-label="Toggle menu"
          className="rounded-full p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            {/* Slide-in panel */}
            <motion.div
              key="panel"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 right-0 z-50 w-[80vw] max-w-sm border-l border-border/60 bg-background shadow-2xl md:hidden"
            >
              <div className="flex h-full flex-col px-6 pt-20 pb-8">
                <motion.nav
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col gap-2"
                >
                  {links.map((l) => (
                    <motion.div key={l.to} variants={itemVariants}>
                      <Link
                        to={l.to}
                        activeOptions={{ exact: l.to === "/" }}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-4 py-3 text-lg font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        activeProps={{ className: "text-foreground bg-secondary/70" }}
                      >
                        {l.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div variants={itemVariants} className="mt-4">
                    <Link
                      to="/booking"
                      onClick={() => setOpen(false)}
                      className="block rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground shadow-md transition-transform duration-200 hover:scale-[1.03]"
                    >
                      Book Inquiry
                    </Link>
                  </motion.div>
                </motion.nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}