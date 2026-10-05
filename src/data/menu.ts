/**
 * Single source of truth for the menu (Home, /menu and /order-online all read this).
 * Edit here to change dishes, prices or which category a dish belongs to.
 *
 * `image` / `orderImage` are file names inside src/assets/home. Items without an image
 * (Dessert and Drink below) render an emoji placeholder – they are PLACEHOLDER dishes so
 * the Dessert / Drink filters have something to show. Replace with real dishes + photos.
 */
export type Category = "Dinner" | "Lunch" | "Dessert" | "Drink";
export type Section = "Pasta" | "Pizza" | "Dessert" | "Drink";

export type MenuItem = {
  id: string;
  name: string;
  section: Section;
  categories: Category[];
  price: number;
  rating: number; // out of 5
  description: string;
  image?: string;
  /** Round crop used on the Order online cards (falls back to `image`). */
  orderImage?: string;
  emoji?: string;
};

// The tab labels keep the original design copy ("All catagory").
export const CATEGORY_TABS = ["All catagory", "Dinner", "Lunch", "Dessert", "Drink"] as const;
export const SECTIONS: Section[] = ["Pasta", "Pizza", "Dessert", "Drink"];

const D = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas consequat mi eget auctor aliquam, diam.";
const P = 12.05;
const LD: Category[] = ["Lunch", "Dinner"];
const DN: Category[] = ["Dinner"];

export const MENU: MenuItem[] = [
  // First six = the original "popular" dishes shown on Home.
  { id: "spaghetti", name: "Spaghetti", section: "Pasta", categories: LD, price: P, rating: 4, description: D, image: "dish1.webp", orderImage: "oo_spaghetti.webp" },
  { id: "gnocchi", name: "Gnocchi", section: "Pasta", categories: DN, price: P, rating: 4, description: D, image: "dish2.webp" },
  { id: "rovioli", name: "Rovioli", section: "Pasta", categories: DN, price: P, rating: 4, description: D, image: "dish3.webp" },
  { id: "penne", name: "Penne Alla Vodak", section: "Pasta", categories: LD, price: P, rating: 4, description: D, image: "dish4.webp", orderImage: "oo_penne.webp" },
  { id: "risotto", name: "Risoto", section: "Pasta", categories: DN, price: P, rating: 4, description: D, image: "dish5.webp" },
  { id: "splitza", name: "Splitza Signature", section: "Pizza", categories: DN, price: P, rating: 4, description: D, image: "dish6.webp", orderImage: "oo_splitza.webp" },

  { id: "linguine", name: "Linguine", section: "Pasta", categories: LD, price: P, rating: 4, description: D, image: "oo_linguine.webp" },
  { id: "capellini", name: "Capellini", section: "Pasta", categories: LD, price: P, rating: 4, description: D, image: "oo_capellini.webp" },
  { id: "fettuccine", name: "Fettuccine", section: "Pasta", categories: LD, price: P, rating: 4, description: D, image: "oo_fettuccine.webp" },
  { id: "bucatini", name: "Bucatini", section: "Pasta", categories: DN, price: P, rating: 4, description: D, image: "oo_bucatini.webp" },
  { id: "tortellini", name: "Tortellini", section: "Pasta", categories: DN, price: P, rating: 4, description: D, image: "oo_tortellini.webp" },
  { id: "fusilli", name: "Fusilli", section: "Pasta", categories: LD, price: P, rating: 4, description: D, image: "oo_fusilli.webp" },
  { id: "farfalle", name: "Farfalle", section: "Pasta", categories: LD, price: P, rating: 4, description: D, image: "oo_farfalle.webp" },

  { id: "supersupreme", name: "Super Supreme", section: "Pizza", categories: DN, price: P, rating: 4, description: D, image: "oo_supersupreme.webp" },
  { id: "veggiegarden", name: "Veggie Garden", section: "Pizza", categories: LD, price: P, rating: 4, description: D, image: "oo_veggiegarden.webp" },
  { id: "doublebeef", name: "Double Beef Burger", section: "Pizza", categories: DN, price: P, rating: 4, description: D, image: "oo_doublebeef.webp" },
  { id: "meatlovers", name: "Meat Lovers", section: "Pizza", categories: DN, price: P, rating: 4, description: D, image: "oo_meatlovers.webp" },
  { id: "extravaganzza", name: "Extravaganzza", section: "Pizza", categories: DN, price: P, rating: 4, description: D, image: "oo_extravaganzza.webp" },
  { id: "meatmeat", name: "Meat & Meat", section: "Pizza", categories: DN, price: P, rating: 4, description: D, image: "oo_meatmeat.webp" },
  { id: "meatzza", name: "Meatzza", section: "Pizza", categories: DN, price: P, rating: 4, description: D, image: "oo_meatzza.webp" },
  { id: "tunadelight", name: "Tuna Delight", section: "Pizza", categories: LD, price: P, rating: 4, description: D, image: "oo_tunadelight.webp" },

  // PLACEHOLDERS – no photos yet.
  { id: "tiramisu", name: "Tiramisu", section: "Dessert", categories: ["Dessert"], price: 6.5, rating: 5, description: D, emoji: "🍰" },
  { id: "pannacotta", name: "Panna Cotta", section: "Dessert", categories: ["Dessert"], price: 5.95, rating: 4, description: D, emoji: "🍮" },
  { id: "gelato", name: "Gelato", section: "Dessert", categories: ["Dessert"], price: 4.5, rating: 4, description: D, emoji: "🍨" },
  { id: "espresso", name: "Espresso", section: "Drink", categories: ["Drink"], price: 2.8, rating: 4, description: D, emoji: "☕" },
  { id: "lemonade", name: "Lemonade", section: "Drink", categories: ["Drink"], price: 3.5, rating: 4, description: D, emoji: "🍋" },
  { id: "sparkling", name: "Sparkling Water", section: "Drink", categories: ["Drink"], price: 2.5, rating: 4, description: D, emoji: "💧" },
];

export const byId = (id: string) => MENU.find((m) => m.id === id);

/** tab index 0 = every category. */
export function filterByTab(tab: number): MenuItem[] {
  if (tab <= 0) return MENU;
  const cat = CATEGORY_TABS[tab] as Category;
  return MENU.filter((m) => m.categories.includes(cat));
}
