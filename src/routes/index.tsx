import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Star } from "lucide-react";
import heroImg from "@/assets/hero-feast.jpg";
import nihariImg from "@/assets/dish-nihari.jpg";
import biryaniImg from "@/assets/dish-biryani.jpg";
import behariImg from "@/assets/dish-behari.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rose Caterings — Authentic Pakistani Catering for Events" },
      {
        name: "description",
        content:
          "Premium, 100% Halal authentic Pakistani home-cooked catering for weddings, aqeeqahs, Eid events and family gatherings across the GTA and Brant County.",
      },
    ],
  }),
  component: Index,
});

const specialties = [
  {
    name: "Shank Nihari",
    img: nihariImg,
    description:
      "Slow-cooked overnight in a rich blend of traditional spices — fall-off-the-bone shank in a deeply aromatic gravy.",
  },
  {
    name: "Biryani",
    img: biryaniImg,
    description:
      "Fragrant basmati layered with tender spiced meat, saffron and slow-fried onions — the centrepiece of every celebration.",
  },
  {
    name: "Behari Boti",
    img: behariImg,
    description:
      "Smoky, char-grilled skewers marinated in a heritage spice blend passed down through generations.",
  },
];

const reviews = [
  {
    name: "Ayesha K.",
    img: biryaniImg,
    comment:
      "Rose Caterings made our wedding unforgettable. The biryani was perfectly spiced and every guest raved about the food. Setup was elegant and the team was incredibly professional.",
  },
  {
    name: "Omar R.",
    img: nihariImg,
    comment:
      "We hired them for our son's aqeeqah and the nihari tasted just like my grandmother used to make. Authentic, generous portions, and served with so much care.",
  },
  {
    name: "Sarah M.",
    img: behariImg,
    comment:
      "Catered our corporate event for 80 guests. Punctual, clean presentation, and the behari boti was the talk of the office for weeks. Will book again without hesitation.",
  },
];

function Index() {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };
  const [heroLoaded, setHeroLoaded] = useState(false);
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-foreground" />
        <img
          src={heroImg}
          alt="An overhead spread of authentic Pakistani dishes"
          width={1600}
          height={1024}
          onLoad={() => setHeroLoaded(true)}
          style={{
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "scale(1)" : "scale(1.04)",
            transition: "opacity 1100ms cubic-bezier(0.22,1,0.36,1), transform 1100ms cubic-bezier(0.22,1,0.36,1)",
            willChange: "opacity, transform",
          }}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-foreground/70 via-foreground/55 to-foreground/80" />
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
          className="mx-auto max-w-5xl px-6 py-32 text-center text-background lg:py-44"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-background/80"
          >
            Authentic · Heritage · Home-Cooked
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            Premium Pakistani catering,<br />
            crafted the way it was meant to be.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 inline-block rounded-full border border-background/40 bg-background/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-background backdrop-blur-sm"
          >
            100% Halal Authentic Pakistani Catering
          </motion.p>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-background/85 sm:text-lg"
          >
            Traditional spice blends, slow-cooking methods, and recipes handed down
            through generations — brought to your wedding, aqeeqah, Eid event,
            corporate gathering or milestone celebration.
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <Link
              to="/booking"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg transition-all duration-300 hover:scale-[1.04] hover:shadow-xl hover:brightness-105"
            >
              Book a Catering Inquiry
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* SERVICE AREA */}
      <section className="border-b border-border/60 bg-secondary/40 py-10">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Proudly Serving
          </p>
          <div className="mt-3 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-10">
            <p className="font-display text-2xl text-foreground sm:text-3xl">
              Greater Toronto Area (GTA)
            </p>
            <span className="hidden text-2xl text-muted-foreground sm:block" aria-hidden>|</span>
            <p className="font-display text-2xl text-foreground sm:text-3xl">
              Brant County &amp; Surroundings
            </p>
          </div>
        </div>
      </section>

      {/* OUR SPECIALTY */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Our Specialty
          </p>
          <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
            Star dishes from our kitchen
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {specialties.map((dish, i) => (
            <motion.article
              key={dish.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <SpecialtyImage src={dish.img} alt={dish.name} />
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl text-foreground">{dish.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {dish.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center text-sm font-medium uppercase tracking-[0.2em] text-primary hover:underline"
          >
            View Full Menu →
          </Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="border-t border-border/60 bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Kind Words
            </p>
            <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
              Loved by families &amp; hosts
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {reviews.map((r) => (
              <article
                key={r.name}
                className="flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={r.img}
                    alt={`Catering by Rose Caterings — reviewed by ${r.name}`}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex gap-1 text-[#d4a84c]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    "{r.comment}"
                  </p>
                  <p className="mt-5 font-display text-lg text-foreground">{r.name}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SpecialtyImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={1024}
      height={768}
      onLoad={() => setLoaded(true)}
      style={{
        opacity: loaded ? 1 : 0,
        transform: loaded ? "scale(1)" : "scale(1.03)",
        transition: "opacity 900ms cubic-bezier(0.22,1,0.36,1), transform 900ms cubic-bezier(0.22,1,0.36,1)",
        willChange: "opacity, transform",
      }}
      className="h-full w-full object-cover"
    />
  );
}
