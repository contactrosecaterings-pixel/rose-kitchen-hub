import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
  const typed = useTypewriter(words);

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <header className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our Menu</p>
        <p className="mt-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
          ✨ 100% Halal Certified
        </p>
        <h1 className="mt-6 font-display text-4xl text-foreground sm:text-6xl">
          <span
            className="flex flex-col items-center justify-center gap-y-1 sm:inline-flex sm:flex-row sm:items-center sm:justify-center sm:gap-x-3"
            style={{ lineHeight: 1.15 }}
          >
            <span>A taste of</span>
            <span
              className="relative inline-flex items-center justify-center text-primary"
              style={{
                minHeight: "1.2em",
                lineHeight: 1.15,
              }}
            >
              <span className="whitespace-nowrap">{typed || "\u00A0"}</span>
              <span
                aria-hidden
                className="ml-[2px] inline-block w-[3px] translate-y-[2px] bg-primary align-middle"
                style={{ height: "0.85em", animation: "rc-caret-blink 1s steps(2) infinite" }}
              />
            </span>
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl rounded-2xl border border-primary/30 bg-secondary/60 px-6 py-4 text-sm font-medium text-foreground">
          All items can be customized upon request. Contact us for a custom quote.
        </p>
      </header>
      <style>{`@keyframes rc-caret-blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }`}</style>
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
                  whileHover={{ y: -6 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="rc-lift rounded-2xl border border-border/70 bg-card p-6 shadow-sm hover:shadow-md"
                >
                  <h3 className="font-display text-xl text-primary">{section.name}</h3>
                  <ul className="mt-4 space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start text-sm leading-relaxed text-foreground">
                        <span className="mr-3 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
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

function useTypewriter(
  words: string[],
  {
    typeSpeed = 90,
    deleteSpeed = 55,
    holdAfterType = 1400,
    holdAfterDelete = 450,
  }: { typeSpeed?: number; deleteSpeed?: number; holdAfterType?: number; holdAfterDelete?: number } = {},
) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting" | "paused">("typing");

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
      } else {
        timeout = setTimeout(() => setPhase("holding"), holdAfterType);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
      } else {
        timeout = setTimeout(() => setPhase("paused"), holdAfterDelete);
      }
    } else if (phase === "paused") {
      timeout = setTimeout(() => {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase("typing");
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIdx, words, typeSpeed, deleteSpeed, holdAfterType, holdAfterDelete]);

  return text;
}