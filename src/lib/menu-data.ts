export type MenuCategory = {
  group: string;
  sections: { name: string; items: string[] }[];
};

export const MENU: MenuCategory[] = [
  {
    group: "Main Course",
    sections: [
      {
        name: "Karahi & Nihari Dishes",
        items: ["Chicken Karhai", "Chicken Nihari", "Lamb Shank Nihari"],
      },
      {
        name: "Traditional Curries",
        items: ["Chikar Cholay", "Gobi Aloo", "Palak Aloo", "Saag", "Bhindi"],
      },
      {
        name: "Rice Dishes",
        items: ["Chicken Biryani", "Chicken Pulao", "Lamb Shank Pulao"],
      },
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
      { name: "Appetizers", items: ["Samosas (Chicken, Beef, or Potato)"] },
      { name: "Breads", items: ["Roti", "Naan", "Butter Naan", "Garlic Naan"] },
      { name: "Sauces", items: ["Raita", "Chutney", "Hummus"] },
      { name: "Desserts", items: ["Kheer", "Kulfi"] },
    ],
  },
];

export const ALL_DISHES: string[] = MENU.flatMap((g) =>
  g.sections.flatMap((s) => s.items),
);