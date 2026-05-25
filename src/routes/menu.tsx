import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MENU } from "@/lib/menu-data";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Rose Caterings" },
      { name: "description", content: "Explore our full menu of authentic Pakistani dishes. All items can be customized." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const words = ["home", "culture", "tradition", "Pakistan"];
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, []);
  const activeWord = words[wordIndex];

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <header className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our Menu</p>
        <h1 className="mt-3 inline-flex flex-wrap items-baseline justify-center font-display text-5xl text-foreground">
          <span>A taste of&nbsp;</span>
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="relative inline-block overflow-hidden align-baseline text-primary"
            style={{ lineHeight: 1.1 }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={activeWord}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block whitespace-nowrap"
              >
                {activeWord}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl rounded-2xl border border-primary/30 bg-secondary/60 px-6 py-4 text-sm font-medium text-foreground">
          All items can be customized upon request. Contact us for a custom quote.
        </p>
      </header>
      <div className="space-y-16">
        {MENU.map((group) => (
          <section key={group.group}>
            <h2 className="mb-8 border-b border-border pb-3 font-display text-3xl text-foreground">{group.group}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.sections.map((section, i) => (
                <motion.article
                  key={section.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h3 className="font-display text-xl text-primary">{section.name}</h3>
                  <ul className="mt-4 space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center text-sm text-foreground">
                        <span className="mr-3 h-1.5 w-1.5 rounded-full bg-primary/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}