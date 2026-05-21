import rawProducts from "./products.json";

export interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subCategory?: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: "Best Seller" | "Hot Deal" | "New" | "Sale";
  inStock: boolean;
  sku: string;
  description: string;
  features: string[];
  packSize?: string;
  weight?: string;
  isOnSale?: boolean;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
  description: string;
  productCount: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  count: number;
  subcategories?: string[];
}

// ─── Category mapping ────────────────────────────────────────────────────────

const CATEGORY_MAP: Record<string, string> = {
  "Cream Chargers": "cream-chargers",
  "8g N2O Cream Chargers": "cream-chargers",
  "8g N2O Cream Chargers (Bulk)": "cream-chargers",
  "8g CO2 Chargers": "bar-supplies",
  "12g CO2 Chargers": "bar-supplies",
  "16g CO2 Chargers": "bar-supplies",
  "N2 Nitro Chargers": "cream-chargers",
  "SALE": "cream-chargers",
  "500ml Cream Whipper": "cream-dispensers",
  "1L Cream Whipper": "cream-dispensers",
  "200g-670g Cylinders": "fast-gas",
  "Syrups": "syrups",
  "Simply": "syrups",
  "Fruit Puree": "syrups",
  "Bubble Tea Syrups": "syrups",
  "Strawberry": "syrups",
  "Raspberry": "syrups",
  "Mint": "syrups",
  "Cherry": "syrups",
  "Orange": "syrups",
  "Lemon": "syrups",
  "Hazelnut": "syrups",
  "Peach": "syrups",
  "Caramel": "syrups",
  "Cinnamon": "syrups",
  "Mango": "syrups",
  "Passionfruit": "syrups",
  "Coconut": "syrups",
  "Gingerbread": "syrups",
  "Lychee": "syrups",
  "Vanilla": "syrups",
  "Lime": "syrups",
  "Salted Caramel": "syrups",
  "Chocolate": "syrups",
  "Pumpkin Spice": "syrups",
  "Rose": "syrups",
  "White Chocolate": "syrups",
  "Amaretto": "syrups",
  "Elderflower": "syrups",
  "Violet": "syrups",
  "Brown Sugar": "syrups",
  "French Vanilla": "syrups",
  "Marshmallow": "syrups",
  "Toffee": "syrups",
  "Watermelon": "syrups",
  "Creme Brulee": "syrups",
  "Honeycomb": "syrups",
  "Pistachio": "syrups",
  "Seasonal Drinks": "syrups",
  "Gourmet Sauce": "syrups",
  "Chai / Spiced Chai": "syrups",
  "Chai Tea": "syrups",
  "Hot Chocolate": "syrups",
  "Incup Chocolate": "syrups",
  "Matcha": "syrups",
  "Frappe": "syrups",
  "Smoothies": "syrups",
  "Milkshakes": "syrups",
  "Topping & Inclusions": "syrups",
  "Popping Boba and Pearls": "syrups",
  "Bubble Tea Milk & Cream": "syrups",
  "Bubble Tea Milk Powder": "syrups",
  "Beverage Ingredients": "syrups",
  "70cl - 75cl Bottles": "syrups",
  "1L Bottles": "syrups",
  "Pumps & Syrup Accessories": "syrups",
  "Bubble Tea Accessories": "syrups",
  "Bubble Tea Cups & Lids": "syrups",
  "Coffee & Tea": "coffee",
  "Coffee Beans (Cases)": "coffee",
  "Coffee Beans (Bulk Buy)": "coffee",
  "Ground Filter Coffee (Cases)": "coffee",
  "Ground Filter Coffee (Bulk Buy)": "coffee",
  "Ground Coffee (Single Bags)": "coffee",
  "Nespresso Pro Capsules": "coffee",
  "44mm ESE Coffee Pods": "coffee",
  "Instant Coffee Sticks": "coffee",
  "Instant Coffee Tins": "coffee",
  "Vending Coffee": "coffee",
  "Incup Vending": "coffee",
  "Catering Tea": "coffee",
  "Envelope Tea": "coffee",
  "Herbal Tea Infusions": "coffee",
  "Vending Chocolate": "coffee",
  "Vending Milk": "coffee",
  "Vending Sugar": "coffee",
  "Milk Pots & Sticks": "coffee",
  "Sugar Sachets & Sticks": "coffee",
  "Dairy-Free Milk Alternatives": "coffee",
  "Water": "coffee",
  "Filter Papers": "coffee",
  "Knock Drawers & Spares": "coffee",
  "Filter Coffee Machines": "coffee",
  "Bar & Cocktail Accessories": "bar-supplies",
  "Cocktail Mixers": "bar-supplies",
  "Jugs & Decanters": "bar-supplies",
  "Desserts": "bar-supplies",
  "Sundries": "bar-supplies",
  "Cups": "bar-supplies",
  "Disposables": "bar-supplies",
  "16-20oz Cups": "bar-supplies",
  "Crepe Machines": "bar-supplies",
  "Waffle Machines": "bar-supplies",
  "Churros Machines": "bar-supplies",
  "Donut Machines": "bar-supplies",
  "Pancake Machines": "bar-supplies",
  "SpaceBun Machine": "bar-supplies",
  "Burger Options": "bar-supplies",
  "Hot Dog Options": "bar-supplies",
  "Lunch Box Options": "bar-supplies",
  "Meal Trays": "bar-supplies",
  "Sandwich & Baguette": "bar-supplies",
  "Soup Bowls & Lids": "bar-supplies",
  "Ice Cream Packaging": "bar-supplies",
  "Greaseproof Paper": "bar-supplies",
  "Paper Bags": "bar-supplies",
  "Blue Roll & Wipes": "bar-supplies",
  "Cleaning Products": "bar-supplies",
  "Brushes & Cleaning": "bar-supplies",
  "Hand & Surface Sanitiser": "bar-supplies",
  "Salt & Pepper Sachets": "bar-supplies",
  "Bottle Warmers": "bar-supplies",
};

// ─── Brand extraction ────────────────────────────────────────────────────────

const KNOWN_BRANDS = [
  "MONIN", "Sweetbird", "Simply Syrups", "Simply", "Lavazza", "iSi", "MOSA",
  "Pro Whip", "SmartWhip", "Fast Gas", "FastGas", "AMOR", "Alpro", "LISS", "Liss",
  "Umarex", "Pro Fizz", "Cream Deluxe", "Nescafe", "Nescafé", "Douwe Egberts",
  "Taylors", "Beanies", "Kenco", "Shmoo", "Puramate", "Tetley", "PG Tips",
  "Cadbury", "Whittard", "Clipper", "Pukka", "Twinings", "Costa", "Starbucks",
  "Barista", "Oatly", "Arla", "Innocent",
];

function extractBrand(name: string): string {
  for (const brand of KNOWN_BRANDS) {
    if (name.startsWith(brand) || name.toLowerCase().startsWith(brand.toLowerCase())) {
      return brand;
    }
  }
  // Fall back to first word(s)
  const words = name.split(" ");
  return words.length >= 2 ? `${words[0]} ${words[1]}` : words[0];
}

// ─── Price parsing ────────────────────────────────────────────────────────────
// Input: "£7.49(£8.99 inc VAT)"
// Returns: { salePrice, originalPrice, discount }

function parsePrice(price: string): { salePrice: number; originalPrice: number; discount: number } {
  const match = price.match(/£([\d.]+)\(£([\d.]+)/);
  if (match) {
    const exVat = parseFloat(match[1]);
    const incVat = parseFloat(match[2]);
    const discount = Math.round((1 - exVat / incVat) * 100);
    return { salePrice: exVat, originalPrice: incVat, discount };
  }
  // Fallback: single price
  const single = price.match(/£([\d.]+)/);
  const p = single ? parseFloat(single[1]) : 0;
  return { salePrice: p, originalPrice: Math.round(p * 1.2 * 100) / 100, discount: 17 };
}

// ─── Category-based features ─────────────────────────────────────────────────

const CATEGORY_FEATURES: Record<string, string[]> = {
  "cream-chargers": ["Food-grade N2O", "100% recyclable steel", "Universal thread", "EU food safety certified", "Next day UK delivery"],
  "cream-dispensers": ["Professional grade", "Stainless steel body", "Includes decorating tips", "Dishwasher safe parts", "Compatible with standard chargers"],
  "fast-gas": ["Large capacity cylinder", "Replaces multiple standard chargers", "Food grade N2O", "Includes adapter", "Cost-effective for high volume use"],
  "syrups": ["Premium quality", "Natural flavours", "Perfect for coffee & cocktails", "Vegan friendly", "UK stock"],
  "coffee": ["Expertly sourced", "Barista quality", "Fresh roasted", "UK stock", "Trade pricing available"],
  "bar-supplies": ["Professional grade", "UK stock", "Trade pricing available", "Fast dispatch", "Genuine product"],
};

// ─── Badge assignment ────────────────────────────────────────────────────────

function assignBadge(index: number, discount: number): Product["badge"] | undefined {
  if (discount >= 20) return "Hot Deal";
  if (index % 7 === 0) return "Best Seller";
  if (index % 11 === 0) return "New";
  return undefined;
}

// ─── Deterministic pseudo-random helpers ─────────────────────────────────────

function pseudoRating(id: number): number {
  return Math.round((4.4 + (id % 7) * 0.1) * 10) / 10;
}

function pseudoReviews(id: number): number {
  return 12 + (id * 37 + id % 13) % 980;
}

// ─── Resolve category slug (handles mis-tagged source data) ─────────────────

type RawProduct = {
  name: string;
  productUrl: string;
  imageUrl: string;
  price: string;
  sku: string;
  inStock: boolean;
  category: string;
};

function resolveCategory(raw: RawProduct): string | undefined {
  const mapped = CATEGORY_MAP[raw.category];
  if (!mapped) return undefined;

  if (raw.category === "Cream Chargers") {
    const name = raw.name;
    if (/CO2/i.test(name)) return "bar-supplies";
    if (/whipper|dispenser|siphon|decorator tip|bundle/i.test(name)) return "cream-dispensers";
    if (/fast\s*gas|640g|670g|580g|200g.*(tank|cylinder)|gold\s*whip.*200|mr\s*\-?\s*whip.*640/i.test(name)) {
      return "fast-gas";
    }
    if (/N2O|cream charger/i.test(name)) return "cream-chargers";
    if (/nitro/i.test(name)) return "bar-supplies";
    return "cream-chargers";
  }

  return mapped;
}

// ─── Transform raw JSON → Product[] ─────────────────────────────────────────

export const products: Product[] = (rawProducts as RawProduct[])
  .filter((raw) => resolveCategory(raw) !== undefined)
  .map((raw, index) => {
    const id = index + 1;
    const category = resolveCategory(raw)!;
    const { salePrice, originalPrice, discount } = parsePrice(raw.price);
    const brand = extractBrand(raw.name);

    return {
      id,
      slug: raw.sku,
      name: raw.name,
      brand,
      category,
      subCategory: raw.category,
      originalPrice,
      salePrice,
      discount,
      rating: pseudoRating(id),
      reviews: pseudoReviews(id),
      image: raw.imageUrl,
      badge: assignBadge(index, discount),
      inStock: raw.inStock,
      sku: raw.sku,
      description: `${raw.name} — premium quality from ${brand}. Available for next day UK delivery.`,
      features: CATEGORY_FEATURES[category] ?? ["UK stock", "Fast dispatch", "Genuine product"],
      isOnSale: discount >= 15,
    };
  });

export const saleProducts = products.filter((p) => p.isOnSale);

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function filterProductsByChargeSize(items: Product[], size: string): Product[] {
  const escaped = size.replace(".", "\\.");
  const re = new RegExp(`\\b${escaped}\\b`, "i");
  return items.filter((p) => re.test(p.name));
}

export function getProductsByBrand(brandName: string): Product[] {
  return products.filter((p) => p.brand === brandName);
}

// ─── Categories (with live counts from data) ─────────────────────────────────

function countByCategory(slug: string) {
  return products.filter((p) => p.category === slug).length;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Refill Chargers",
    slug: "cream-chargers",
    description: "Premium N2O refill chargers from all leading brands",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
    icon: "🫧",
    count: countByCategory("cream-chargers"),
    subcategories: ["8g", "12g", "16g", "88g", "200g", "640g"],
  },
  {
    id: 2,
    name: "Cream Dispensers",
    slug: "cream-dispensers",
    description: "Professional cream whippers and siphons for every kitchen",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop",
    icon: "🍶",
    count: countByCategory("cream-dispensers"),
    subcategories: ["0.5L Dispensers", "1L Dispensers", "Parts & Accessories"],
  },
  {
    id: 3,
    name: "Fast Gas / N2O Tanks",
    slug: "fast-gas",
    description: "Large N2O cylinders for high-volume professional use",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    icon: "⚡",
    count: countByCategory("fast-gas"),
    subcategories: ["200g Cylinders", "580g Cylinders", "670g Cylinders", "Regulators"],
  },
  {
    id: 4,
    name: "Flavouring Syrups",
    slug: "syrups",
    description: "Over 200 flavours from MONIN, Sweetbird, Simply & more",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&h=400&fit=crop",
    icon: "🍯",
    count: countByCategory("syrups"),
    subcategories: ["MONIN Syrups", "Sweetbird", "Simply", "Purees", "Sauces"],
  },
  {
    id: 5,
    name: "Coffee Supplies",
    slug: "coffee",
    description: "Premium coffee beans, pods and accessories from top brands",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
    icon: "☕",
    count: countByCategory("coffee"),
    subcategories: ["Coffee Beans", "Pods", "Milk Alternatives", "Accessories"],
  },
  {
    id: 6,
    name: "Bar Supplies",
    slug: "bar-supplies",
    description: "Professional bar tools, cocktail equipment and more",
    image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=600&h=400&fit=crop",
    icon: "🍸",
    count: countByCategory("bar-supplies"),
    subcategories: ["Cocktail Tools", "Soda Siphons", "CO2 Cartridges", "Ice"],
  },
];

// ─── Brands (derived from product data) ──────────────────────────────────────

function countByBrand(name: string) {
  return products.filter((p) => p.brand === name).length;
}

export const brands: Brand[] = [
  { id: 1, name: "MONIN", slug: "monin", logo: "MN", description: "World's #1 flavouring syrup brand", productCount: countByBrand("MONIN") },
  { id: 2, name: "Simply", slug: "simply", logo: "SY", description: "Natural syrups and beverage ingredients", productCount: countByBrand("Simply") },
  { id: 3, name: "AMOR", slug: "amor", logo: "AM", description: "Professional N2O refill chargers", productCount: countByBrand("AMOR") },
  { id: 4, name: "Sweetbird", slug: "sweetbird", logo: "SB", description: "Natural syrups for baristas", productCount: countByBrand("Sweetbird") },
  { id: 5, name: "Lavazza", slug: "lavazza", logo: "LV", description: "Italy's favourite coffee brand since 1895", productCount: countByBrand("Lavazza") },
  { id: 6, name: "iSi", slug: "isi", logo: "iSi", description: "World's leading cream whipper manufacturer", productCount: countByBrand("iSi") },
  { id: 7, name: "MOSA", slug: "mosa", logo: "MS", description: "Premium quality refill chargers since 1948", productCount: countByBrand("MOSA") },
  { id: 8, name: "LISS", slug: "liss", logo: "LS", description: "Quality CO2 and N2O chargers", productCount: countByBrand("LISS") },
  { id: 9, name: "Pro Whip", slug: "pro-whip", logo: "PW", description: "Professional grade N2O chargers and dispensers", productCount: countByBrand("Pro Whip") },
  { id: 10, name: "Nescafe", slug: "nescafe", logo: "NC", description: "World's most popular instant coffee brand", productCount: countByBrand("Nescafe") },
  { id: 11, name: "Alpro", slug: "alpro", logo: "AL", description: "Plant-based milk alternatives", productCount: countByBrand("Alpro") },
  { id: 12, name: "Barista", slug: "barista", logo: "BR", description: "Professional barista supplies", productCount: countByBrand("Barista") },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
