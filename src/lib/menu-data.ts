export type MenuCategory = {
  group: string;
  sections: { name: string; items: string[] }[];
};

export const MENU: MenuCategory[] = [
  {
    group: "Main Course",
    sections: [
      { name: "Karahi & Nihari Dishes", items: ["Karahi", "Nihari", "Shank Nihari"] },
      {
        name: "Traditional Curries",
        items: ["Chikar Cholay", "Gobi Aloo", "Palak Aloo", "Saag", "Bhindi"],
      },
      { name: "Rice Dishes", items: ["Biryani", "Pulao", "Shank Pulao"] },
      {
        name: "BBQ & Grilled",
        items: ["Tikka Boti", "Tikka Leg", "Seekh Kabab", "Behari Boti"],
      },
      { name: "Keema Specials", items: ["Keema with Aloo Mutter", "Dum Keema"] },
    ],
  },
  {
    group: "Sides & Sweets",
    sections: [
      { name: "Breads", items: ["Roti", "Naan", "Butter Naan", "Garlic Naan"] },
      { name: "Sauces", items: ["Raita", "Chutney"] },
      { name: "Desserts", items: ["Gulab Jamun", "Kheer"] },
    ],
  },
];

export const ALL_DISHES: string[] = MENU.flatMap((g) =>
  g.sections.flatMap((s) => s.items),
);