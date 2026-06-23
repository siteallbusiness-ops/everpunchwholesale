"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Product } from "@/data/products";
import {
  filterProductsByChargeSize,
  filterProductsByGasType,
  filterSyrupProducts,
  filterCoffeeProducts,
} from "@/data/products";
import ProductCard from "@/components/ProductCard";

export type SubCategoryTab = {
  label: string;
  href: string;
  /** Hash fragment without # — primary filter key */
  filterKey?: string;
  /** @deprecated use filterKey — filters by cartridge size */
  filterSize?: string;
  /** @deprecated use filterKey — filters by gas type */
  filterGas?: "co2" | "n2o";
};

export type ProductFilterMode = "refill" | "syrup" | "coffee";

function tabFilterKey(tab: SubCategoryTab): string | undefined {
  return tab.filterKey ?? tab.filterSize ?? tab.filterGas;
}

function scrollToPageTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

type Props = {
  products: Product[];
  subCategories?: SubCategoryTab[];
  filterMode?: ProductFilterMode;
  emptyMessage?: string;
};

export default function CategoryProductListing({
  products: allProducts,
  subCategories = [],
  filterMode = "refill",
  emptyMessage = "No products match this filter.",
}: Props) {
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    function syncFromHash(scroll = false) {
      const raw = window.location.hash.replace(/^#/, "");
      if (!raw) {
        setActiveFilter(null);
        return;
      }
      // Prefer the last matching segment (handles malformed URLs like #640g#8g)
      const segments = raw.split("#");
      for (let i = segments.length - 1; i >= 0; i--) {
        const tab = subCategories.find((s) => tabFilterKey(s) === segments[i]);
        const key = tab ? tabFilterKey(tab) : undefined;
        if (key) {
          setActiveFilter(key);
          if (scroll) scrollToPageTop();
          return;
        }
      }
      setActiveFilter(null);
    }
    syncFromHash(true);
    const onHashChange = () => syncFromHash(true);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [subCategories]);

  const filtered = useMemo(() => {
    if (!activeFilter) return allProducts;
    switch (filterMode) {
      case "syrup":
        return filterSyrupProducts(allProducts, activeFilter);
      case "coffee":
        return filterCoffeeProducts(allProducts, activeFilter);
      default: {
        const gasTab = subCategories.find((s) => s.filterGas === activeFilter);
        if (gasTab?.filterGas) {
          return filterProductsByGasType(allProducts, gasTab.filterGas);
        }
        return filterProductsByChargeSize(allProducts, activeFilter);
      }
    }
  }, [allProducts, activeFilter, subCategories, filterMode]);

  const activeLabel =
    subCategories.find((s) => tabFilterKey(s) === activeFilter)?.label ?? activeFilter;

  return (
    <>
      {subCategories.length > 0 && (
        <div className="bg-white border-b border-gray-200 sticky top-[104px] z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
              <button
                type="button"
                onClick={() => {
                  setActiveFilter(null);
                  window.history.replaceState(null, "", pathname);
                }}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                  !activeFilter
                    ? "border-emerald-400 text-emerald-600 bg-emerald-50"
                    : "border-gray-200 text-gray-700 hover:border-emerald-400 hover:text-emerald-600"
                }`}
              >
                All
              </button>
              {subCategories.map((s) => {
                const isExternal = s.href.startsWith("/");
                const key = tabFilterKey(s);
                const isActive = Boolean(key && activeFilter === key);

                if (isExternal) {
                  return (
                    <Link
                      key={s.label}
                      href={s.href}
                      className="whitespace-nowrap px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-emerald-400 hover:text-emerald-600 transition-colors"
                    >
                      {s.label}
                    </Link>
                  );
                }

                return (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => {
                      const filterKey = tabFilterKey(s) ?? null;
                      setActiveFilter(filterKey);
                      if (filterKey) {
                        window.history.replaceState(null, "", `${pathname}#${filterKey}`);
                      } else {
                        window.history.replaceState(null, "", pathname);
                      }
                    }}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                      isActive
                        ? "border-emerald-400 text-emerald-600 bg-emerald-50"
                        : "border-gray-200 text-gray-700 hover:border-emerald-400 hover:text-emerald-600"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          {activeFilter ? ` · ${activeLabel}` : ""}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-12">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  );
}
