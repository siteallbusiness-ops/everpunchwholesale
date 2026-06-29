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
  /** Primary cartridge/cylinder size, e.g. 8g, 12g, 640g */
  chargeSize?: string;
  gasType?: "n2o" | "co2" | "n2";
  packOption?: "single" | "case-of-6";
  is640gCylinder?: boolean;
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
  "8g CO2 Chargers": "cream-chargers",
  "12g CO2 Chargers": "cream-chargers",
  "16g CO2 Chargers": "cream-chargers",
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
  "EverPunch", "MONIN", "Sweetbird", "Simply Syrups", "Simply", "Lavazza", "iSi", "MOSA",
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

// ─── Product metadata extraction ─────────────────────────────────────────────

export const SINGLE_UNIT_640G_LIMIT = 3;

type RawProduct = {
  name: string;
  productUrl: string;
  imageUrl: string;
  price: string;
  sku: string;
  inStock: boolean;
  category: string;
};

export function extractChargeSize(name: string): string | undefined {
  const packMatch = name.match(/(?:\d+\s*x\s*|x\s*)(\d+(?:\.\d+)?g)\b/i);
  if (packMatch) return packMatch[1].toLowerCase();

  const parenMatch = name.match(/\((\d+(?:\.\d+)?g)\)/i);
  if (parenMatch) return parenMatch[1].toLowerCase();

  const cylinderMatch = name.match(/\b(\d+(?:\.\d+)?g)\s+cylinder/i);
  if (cylinderMatch) return cylinderMatch[1].toLowerCase();

  const tankMatch = name.match(/\b(\d+(?:\.\d+)?g)\s+tank/i);
  if (tankMatch) return tankMatch[1].toLowerCase();

  const sizes = [...name.matchAll(/\b(\d+(?:\.\d+)?g)\b/gi)].map((m) => m[1].toLowerCase());
  if (!sizes.length) return undefined;

  const priority = ["640g", "670g", "580g", "200g", "88g", "45g", "16g", "12g", "8.5g", "8.4g", "8g", "2.4g", "2.2g"];
  for (const size of priority) {
    if (sizes.includes(size)) return size;
  }
  return sizes[0];
}

export function extractGasType(name: string): Product["gasType"] {
  if (/\bCO2\b/i.test(name)) return "co2";
  if (/\bN2O\b|cream charger/i.test(name)) return "n2o";
  if (/\bn2\b(?!o)|nitro charger/i.test(name)) return "n2";
  return undefined;
}

export function extractPackOption(name: string): Product["packOption"] | undefined {
  if (/\(\s*6\s*x\s*640g\s*\)|\b6\s*x\s*640g\b/i.test(name)) return "case-of-6";
  if (/\b640g\b/i.test(name) && /cylinder/i.test(name)) return "single";
  return undefined;
}

export function is640gCylinderProduct(name: string): boolean {
  return /\b640g\b/i.test(name) && /cylinder/i.test(name);
}

function isBarSupplyAccessory(name: string): boolean {
  return /tyre inflator|retro co2 cartridge holder|decorator tip|charger holder|pressure discharge nozzle|pressure.?regulator/i.test(
    name,
  );
}

function isDispenserProduct(name: string): boolean {
  return /whipper|dispenser|siphon|bundle|decorator tip/i.test(name) && !/cylinder|charger|cartridge/i.test(name);
}

function isFastGasProduct(name: string): boolean {
  if (is640gCylinderProduct(name)) return false;
  return /fast\s*gas|670g|580g|200g.*(tank|cylinder)|gold\s*whip.*200/i.test(name);
}

// ─── Resolve category slug (handles mis-tagged source data) ─────────────────

function resolveCategory(raw: RawProduct): string | undefined {
  const mapped = CATEGORY_MAP[raw.category];
  if (!mapped) return undefined;

  const name = raw.name;

  if (isBarSupplyAccessory(name)) return "bar-supplies";
  if (isDispenserProduct(name)) return "cream-dispensers";
  if (is640gCylinderProduct(name)) return "cream-chargers";
  if (isFastGasProduct(name)) return "fast-gas";

  if (
    mapped === "cream-chargers" ||
    raw.category === "Cream Chargers" ||
    raw.category === "8g CO2 Chargers" ||
    raw.category === "12g CO2 Chargers" ||
    raw.category === "16g CO2 Chargers" ||
    raw.category === "8g N2O Cream Chargers" ||
    raw.category === "8g N2O Cream Chargers (Bulk)" ||
    raw.category === "N2 Nitro Chargers"
  ) {
    if (/\bCO2\b/i.test(name) && /cartridge|charger/i.test(name)) return "cream-chargers";
    if (/\bn2\b(?!o)|nitro charger/i.test(name)) return "cream-chargers";
    if (/N2O|cream charger/i.test(name)) return "cream-chargers";
    if (extractGasType(name)) return "cream-chargers";
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
    const chargeSize = extractChargeSize(raw.name);
    const gasType = extractGasType(raw.name);
    const packOption = extractPackOption(raw.name);
    const is640gCylinder = is640gCylinderProduct(raw.name);
    const packSize = packOption === "case-of-6" ? "Case of 6" : packOption === "single" && is640gCylinder ? "1 unit" : undefined;

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
      chargeSize,
      gasType,
      packOption,
      is640gCylinder,
      packSize,
      weight: chargeSize,
    };
  });

export const saleProducts = products.filter((p) => p.isOnSale);

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

/** All refill cartridges and 640g cylinders for the Refill Chargers listing */
export function getRefillChargerProducts(): Product[] {
  return products.filter((p) => p.category === "cream-chargers");
}

export function isCo2RefillProduct(product: Product): boolean {
  return product.gasType === "co2" || /\bCO2\b/i.test(product.name);
}

export function isN2oRefillProduct(product: Product): boolean {
  if (isCo2RefillProduct(product)) return false;
  return product.gasType === "n2o" || /\bN2O\b|cream charger/i.test(product.name);
}

export function isN2RefillProduct(product: Product): boolean {
  if (isCo2RefillProduct(product) || isN2oRefillProduct(product)) return false;
  return product.gasType === "n2" || /\bn2\b(?!o)|nitro charger/i.test(product.name);
}

export function isSingleUnit640gCylinder(product: Product): boolean {
  return Boolean(product.is640gCylinder && product.packOption === "single");
}

export function filterProductsByGasType(
  items: Product[],
  gas: "co2" | "n2o" | "n2",
): Product[] {
  switch (gas) {
    case "co2":
      return items.filter(isCo2RefillProduct);
    case "n2":
      return items.filter(isN2RefillProduct);
    default:
      return items.filter(isN2oRefillProduct);
  }
}

const SIZE_FILTER_ALIASES: Record<string, string[]> = {
  "8g": ["8g", "8.4g", "8.5g"],
};

export function filterProductsByChargeSize(items: Product[], size: string): Product[] {
  const normalized = size.toLowerCase();
  const accepted = SIZE_FILTER_ALIASES[normalized] ?? [normalized];

  return items.filter((p) => {
    if (p.chargeSize) return accepted.includes(p.chargeSize);
    const escaped = normalized.replace(".", "\\.");
    const re = new RegExp(`\\b${escaped}\\b`, "i");
    return re.test(p.name);
  });
}

export function get640gCylinderVariants(product: Product): Product[] {
  if (!product.is640gCylinder || !product.gasType) return [];
  return products.filter(
    (p) =>
      p.is640gCylinder &&
      p.gasType === product.gasType &&
      p.brand === product.brand &&
      p.id !== product.id,
  );
}

export function filterSyrupProducts(items: Product[], key: string): Product[] {
  switch (key) {
    case "monin":
      return items.filter((p) => p.brand === "MONIN");
    case "sweetbird":
      return items.filter((p) => p.brand === "Sweetbird");
    case "simply":
      return items.filter((p) => p.brand === "Simply" || p.brand === "Simply Syrups");
    case "purees-sauces":
      return items.filter(
        (p) =>
          /puree|sauce/i.test(p.subCategory ?? "") ||
          /puree|sauce/i.test(p.name),
      );
    default:
      return items;
  }
}

export function filterCoffeeProducts(items: Product[], key: string): Product[] {
  switch (key) {
    case "beans":
      return items.filter(
        (p) =>
          (/bean|ground|coffee|roast/i.test(p.name) || /coffee bean|ground filter/i.test(p.subCategory ?? "")) &&
          !/pod|capsule|milk|alpro|oatly|tea bag/i.test(p.name),
      );
    case "pods":
      return items.filter((p) => /pod|capsule|nespresso|dolce gusto|tassimo/i.test(p.name));
    case "milk-alternatives":
      return items.filter(
        (p) =>
          p.brand === "Alpro" ||
          p.brand === "Oatly" ||
          /milk alternative|plant.?based|oat milk|soya milk|coconut milk|barista milk/i.test(p.name),
      );
    default:
      return items;
  }
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
    description: "Premium N2O and CO2 refill chargers from all leading brands",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
    icon: "🫧",
    count: countByCategory("cream-chargers"),
    subcategories: ["N2O Refill", "CO2 Refill", "N2 Refill", "8g", "12g", "16g", "88g", "640g"],
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
    subcategories: ["Cocktail Tools", "Soda Siphons", "Ice"],
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
