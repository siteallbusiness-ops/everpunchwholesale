"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  products,
  isSingleUnit640gCylinder,
  SINGLE_UNIT_640G_LIMIT,
} from "@/data/products";

export type CartItem = {
  slug: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  countSingle640gUnits: () => number;
  addItem: (slug: string, quantity?: number) => boolean;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "everpunch-cart";

const CartContext = createContext<CartContextValue | null>(null);

function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

function countSingle640gUnits(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const product = getProduct(item.slug);
    if (product && isSingleUnit640gCylinder(product)) {
      return sum + item.quantity;
    }
    return sum;
  }, 0);
}

function clampSingle640gQuantity(
  items: CartItem[],
  slug: string,
  requestedQuantity: number,
): number {
  const product = getProduct(slug);
  if (!product || !isSingleUnit640gCylinder(product)) return requestedQuantity;

  const existingQty = items.find((i) => i.slug === slug)?.quantity ?? 0;
  const otherSingleQty = countSingle640gUnits(items) - existingQty;
  const maxAllowed = Math.max(0, SINGLE_UNIT_640G_LIMIT - otherSingleQty);
  return Math.min(requestedQuantity, maxAllowed);
}

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((slug: string, quantity = 1) => {
    let added = false;
    setItems((prev) => {
      const allowedQty = clampSingle640gQuantity(prev, slug, quantity);
      if (allowedQty < 1) return prev;

      added = true;
      const existing = prev.find((i) => i.slug === slug);
      if (existing) {
        const nextQty = clampSingle640gQuantity(
          prev,
          slug,
          existing.quantity + allowedQty,
        );
        if (nextQty <= existing.quantity) return prev;
        return prev.map((i) =>
          i.slug === slug ? { ...i, quantity: nextQty } : i,
        );
      }
      return [...prev, { slug, quantity: allowedQty }];
    });
    return added;
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.slug !== slug));
      return;
    }
    setItems((prev) => {
      const nextQty = clampSingle640gQuantity(prev, slug, quantity);
      if (nextQty < 1) {
        return prev.filter((i) => i.slug !== slug);
      }
      return prev.map((i) => (i.slug === slug ? { ...i, quantity: nextQty } : i));
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const countSingle640gUnitsFn = useCallback(
    () => countSingle640gUnits(items),
    [items],
  );

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      countSingle640gUnits: countSingle640gUnitsFn,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, itemCount, countSingle640gUnitsFn, addItem, removeItem, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
