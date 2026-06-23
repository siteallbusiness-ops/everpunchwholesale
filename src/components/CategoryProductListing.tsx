"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Product } from "@/data/products";
import {
  filterProductsByChargeSize,
  filterProductsByGasType,
} from "@/data/products";
import ProductCard from "@/components/ProductCard";

export type SubCategoryTab = {
  label: string;
  href: string;
  /** Hash fragment without #, e.g. "8g" — filters by cartridge size */
  filterSize?: string;
  /** "co2" | "n2o" — filters by gas type */
  filterGas?: "co2" | "n2o";
};

type Props = {
  products: Product[];
  subCategories?: SubCategoryTab[];
  emptyMessage?: string;
};

export default function CategoryProductListing({
  products: allProducts,
  subCategories = [],
  emptyMessage = "No products match this filter.",
}: Props) {
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    function syncFromHash() {
      const raw = window.location.hash.replace(/^#/, "");
      if (!raw) {
        setActiveFilter(null);
        return;
      }
      // Prefer the last matching segment (handles malformed URLs like #640g#8g)
      const segments = raw.split("#");
      for (let i = segments.length - 1; i >= 0; i--) {
        const tab = subCategories.find(
          (s) => s.filterSize === segments[i] || s.filterGas === segments[i],
        );
        if (tab?.filterSize || tab?.filterGas) {
          setActiveFilter(tab.filterSize ?? tab.filterGas ?? null);
          return;
        }
      }
      setActiveFilter(null);
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [subCategories]);

  const filtered = useMemo(() => {
    if (!activeFilter) return allProducts;
    const gasTab = subCategories.find((s) => s.filterGas === activeFilter);
    if (gasTab?.filterGas) {
      return filterProductsByGasType(allProducts, gasTab.filterGas);
    }
    return filterProductsByChargeSize(allProducts, activeFilter);
  }, [allProducts, activeFilter, subCategories]);

  const activeLabel =
    subCategories.find(
      (s) => s.filterSize === activeFilter || s.filterGas === activeFilter,
    )?.label ?? activeFilter;

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
                const isActive = Boolean(
                  (s.filterSize && activeFilter === s.filterSize) ||
                    (s.filterGas && activeFilter === s.filterGas),
                );

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
                      const key = s.filterSize ?? s.filterGas ?? null;
                      setActiveFilter(key);
                      if (key) {
                        window.history.replaceState(null, "", `${pathname}#${key}`);
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
