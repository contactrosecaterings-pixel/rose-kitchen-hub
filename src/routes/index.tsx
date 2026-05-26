import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import heroImg from "@/assets/hero-feast.jpg";
import nihariImg from "@/assets/dish-nihari.jpg";
import biryaniImg from "@/assets/dish-biryani-fresh.jpg";
import behariImg from "@/assets/dish-behari.jpg";
import reviewFamily from "@/assets/review-family.jpg";
import reviewBuffet from "@/assets/review-buffet.jpg";
import reviewPlatter from "@/assets/review-platter.jpg";

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
    role: "Wedding",
    img: reviewFamily,
    comment:
      "Rose Caterings made our wedding unforgettable. The biryani was perfectly spiced and every guest raved about the food. Setup was elegant and the team was incredibly professional.",
  },
  {
    name: "Omar R.",
    role: "Aqeeqah",
    img: reviewBuffet,
    comment:
      "We hired them for our son's aqeeqah and the nihari tasted just like my grandmother used to make. Authentic, generous portions, and served with so much care.",
  },
  {
    name: "Sarah M.",
    role: "Corporate Event",
    img: reviewPlatter,
    comment:
      "Catered our corporate event for 80 guests. Punctual, clean presentation, and the behari boti was the talk of the office for weeks. Will book again without hesitation.",
  },
];

function Index() {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.08]);
  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-svh items-center overflow-hidden lg:min-h-0 lg:block">
        <div className="absolute inset-0 -z-10 bg-foreground" />
        <motion.div
          className="absolute inset-0 -z-10"
          style={{ y: heroY, scale: heroScale, willChange: "transform" }}
        >
          <img
            src={heroImg}
            alt="An overhead spread of authentic Pakistani dishes"
            width={1600}
            height={1024}
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ willChange: "transform" }}
          />
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={heroImg}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ willChange: "transform", backfaceVisibility: "hidden" }}
          >
            {/* To use a local asset, drop the file into /public and uncomment:
            <source src="/hero-banner.mp4" type="video/mp4" /> */}
            <source
              src="https://videos.pexels.com/video-files/3196284/3196284-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-foreground/75 via-foreground/60 to-foreground/85"
          style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
        />
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
          className="mx-auto w-full max-w-5xl px-6 py-12 text-center text-background sm:py-20 lg:py-44"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-background/80 sm:mb-5 sm:text-xs"
          >
            Authentic · Heritage · Home-Cooked
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[2.25rem] leading-[1.08] sm:text-6xl lg:text-7xl"
          >
            Premium Pakistani catering,<br />
            crafted the way it was meant to be.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-4 inline-block rounded-full border border-background/40 bg-background/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-background backdrop-blur-sm sm:mt-6 sm:px-5 sm:py-2 sm:text-xs"
          >
            100% Halal Authentic Pakistani Catering
          </motion.p>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-background/85 sm:mt-6 md:text-base lg:text-lg"
          >
            Traditional spice blends, slow-cooking methods, and recipes handed down
            through generations — brought to your wedding, aqeeqah, Eid event,
            corporate gathering or milestone celebration.
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 sm:mt-10"
          >
            <Link
              to="/booking"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-lg transition-all duration-300 hover:scale-[1.04] hover:shadow-xl hover:brightness-105 sm:px-8 sm:py-4 sm:text-base"
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
              whileHover={{ y: -6 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="rc-lift group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <ParallaxImage src={dish.img} alt={dish.name} eager />
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
      <section className="border-t border-border/60 bg-gradient-to-b from-secondary/20 via-secondary/40 to-secondary/20 py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Kind Words
            </p>
            <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
              Loved by families &amp; hosts
            </h2>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.18 } },
            }}
            className="-mx-6 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-6 pb-16 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:snap-none md:grid-cols-3 md:items-start md:gap-8 md:overflow-visible md:px-0 md:pb-0 md:pt-0"
          >
            {reviews.map((r, i) => (
              <motion.article
                key={r.name}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={[
                  "rc-lift relative flex w-[85vw] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-primary/15 bg-card/95 p-7 shadow-[0_30px_60px_-30px_rgba(120,80,30,0.25)] backdrop-blur-sm hover:shadow-[0_40px_70px_-30px_rgba(120,80,30,0.35)] md:w-auto md:shrink md:snap-align-none",
                  i === 1 ? "md:mt-10" : "",
                  i === 2 ? "md:-mt-4" : "",
                ].join(" ")}
              >
                <div
                  className={[
                    "relative overflow-hidden rounded-2xl bg-secondary",
                    i === 0 ? "aspect-[5/4]" : "",
                    i === 1 ? "aspect-[4/5]" : "",
                    i === 2 ? "aspect-[5/3]" : "",
                  ].join(" ")}
                >
                  <ParallaxImage src={r.img} alt={`Catering by Rose Caterings — reviewed by ${r.name}`} />
                </div>
                <div className="mt-6 flex items-center gap-1 text-[#d4a84c]">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-[18px] w-[18px] fill-current" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-4 flex-1 font-display text-[17px] italic leading-relaxed text-foreground/90">
                  &ldquo;{r.comment}&rdquo;
                </p>
                <div className="mt-6 border-t border-primary/15 pt-4">
                  <p className="font-display text-lg text-foreground">{r.name}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {r.role}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

function ParallaxImage({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-secondary">
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "low"}
        width={1024}
        height={768}
        style={{ y, scale: 1.12, willChange: "transform", backfaceVisibility: "hidden" }}
        className="h-full w-full object-cover animate-[rc-fade-in_500ms_ease-out_both]"
      />
      <style>{`@keyframes rc-fade-in { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
}