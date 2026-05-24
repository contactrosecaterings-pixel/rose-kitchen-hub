import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
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
          "Premium, authentic Pakistani home-cooked catering for weddings, aqeeqahs, Eid events and family gatherings across Paris, Brantford and the GTA.",
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

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="An overhead spread of authentic Pakistani dishes"
          width={1600}
          height={1024}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-foreground/70 via-foreground/55 to-foreground/80" />
        <div className="mx-auto max-w-5xl px-6 py-32 text-center text-background lg:py-44">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-background/80">
            Authentic · Heritage · Home-Cooked
          </p>
          <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Premium Pakistani catering,<br />
            crafted the way it was meant to be.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-background/85 sm:text-lg">
            Traditional spice blends, slow-cooking methods, and recipes handed down
            through generations — brought to your wedding, aqeeqah, Eid event,
            corporate gathering or milestone celebration.
          </p>
          <div className="mt-10">
            <Link
              to="/booking"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-105"
            >
              Book a Catering Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="border-b border-border/60 bg-secondary/40 py-10">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Proudly Serving
          </p>
          <p className="mt-3 font-display text-2xl text-foreground sm:text-3xl">
            Paris · Brantford · Greater Toronto Area
          </p>
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
          {specialties.map((dish) => (
            <article
              key={dish.name}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={dish.img}
                  alt={dish.name}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl text-foreground">{dish.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {dish.description}
                </p>
              </div>
            </article>
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
    </>
  );
}
