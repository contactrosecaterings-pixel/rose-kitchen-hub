import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Rose Caterings" },
      { name: "description", content: "Authentic, heritage Pakistani home-cooked food for weddings, aqeeqahs, Eid events, and milestone celebrations." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our Story</p>
      <h1 className="mt-3 font-display text-5xl text-foreground">Heritage on every plate.</h1>
      <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/85">
        <p>Rose Caterings was born from a lifelong love of cooking the food that raised us — generous, unhurried, and unapologetically authentic Pakistani home cooking. Every dish leaves our kitchen the way our mothers and grandmothers taught us: spices freshly bloomed, meats slow-cooked for hours, and rice layered with patience.</p>
        <p>We cater weddings, aqeeqahs, family gatherings, Eid events, corporate celebrations, and milestone occasions — large or intimate. Every menu is shaped around your guests, your dietary needs, and the story of the day.</p>
        <p>Our halal kitchen sources quality ingredients, hand-grinds our own spice blends, and treats every event as if we were cooking for our own family. From the first phone call to the final tray of biryani, you'll feel the difference.</p>
      </div>
    </div>
  );
}