"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/data/products";
import { categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal } from "lucide-react";

const BRANDS = ["Pro Whip", "MOSA", "iSi", "SmartWhip", "MONIN", "Sweetbird"];

type Props = {
  products: Product[];
};

export default function ShopProductListing({ products: allProducts }: Props) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "";

  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(() =>
    initialCategory ? new Set([initialCategory]) : new Set()
  );
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("best");

  const filtered = useMemo(() => {
    let list = [...allProducts];

    if (selectedCategories.size > 0) {
      list = list.filter((p) => selectedCategories.has(p.category));
    }
    if (selectedBrands.size > 0) {
      list = list.filter((p) => selectedBrands.has(p.brand));
    }
    if (onSaleOnly) {
      list = list.filter((p) => p.isOnSale);
    }
    const min = minPrice ? parseFloat(minPrice) : null;
    const max = maxPrice ? parseFloat(maxPrice) : null;
    if (min !== null && !Number.isNaN(min)) {
      list = list.filter((p) => p.salePrice >= min);
    }
    if (max !== null && !Number.isNaN(max)) {
      list = list.filter((p) => p.salePrice <= max);
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case "price-desc":
        list.sort((a, b) => b.salePrice - a.salePrice);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return list;
  }, [allProducts, selectedCategories, selectedBrands, onSaleOnly, minPrice, maxPrice, sort]);

  function toggleCategory(slug: string) {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  function toggleBrand(brand: string) {
    setSelectedBrands((prev) => {
      const next = new Set(prev);
      if (next.has(brand)) next.delete(brand);
      else next.add(brand);
      return next;
    });
  }

  function clearAll() {
    setSelectedCategories(new Set());
    setSelectedBrands(new Set());
    setOnSaleOnly(false);
    setMinPrice("");
    setMaxPrice("");
    setSort("best");
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="w-full lg:w-64 shrink-0">
        <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-24">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </h3>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-emerald-500 hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-sm text-gray-700 mb-3">Category</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="accent-emerald-500 w-4 h-4"
                      checked={selectedCategories.has(cat.slug)}
                      onChange={() => toggleCategory(cat.slug)}
                    />
                    <span className="text-sm text-gray-700 group-hover:text-emerald-600 transition-colors">
                      {cat.name}
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">({cat.count})</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-sm text-gray-700 mb-3">Brand</h4>
            <ul className="space-y-2">
              {BRANDS.map((b) => (
                <li key={b}>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="accent-emerald-500 w-4 h-4"
                      checked={selectedBrands.has(b)}
                      onChange={() => toggleBrand(b)}
                    />
                    <span className="text-sm text-gray-700 group-hover:text-emerald-600 transition-colors">{b}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-sm text-gray-700 mb-3">Price Range</h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-emerald-400"
              />
              <span className="text-gray-400">–</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-emerald-500 w-4 h-4"
                checked={onSaleOnly}
                onChange={(e) => setOnSaleOnly(e.target.checked)}
              />
              <span className="text-sm font-medium text-gray-700">On Sale Only</span>
            </label>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
          >
            <option value="best">Sort: Best Selling</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No products match your filters.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
