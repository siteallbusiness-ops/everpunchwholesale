"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const TABS: { label: string; slug: string | null }[] = [
  { label: "All", slug: null },
  { label: "Refill Chargers", slug: "cream-chargers" },
  { label: "Dispensers", slug: "cream-dispensers" },
  { label: "Syrups", slug: "syrups" },
];

export default function FeaturedProducts() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const featured = useMemo(() => {
    const list = activeSlug
      ? products.filter((p) => p.category === activeSlug)
      : products;
    return list.slice(0, 8);
  }, [activeSlug]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-emerald-500 font-semibold text-xs uppercase tracking-widest mb-1">Top Picks</p>
            <h2 className="text-2xl font-extrabold text-gray-900">Bestselling Products</h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {TABS.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={() => setActiveSlug(t.slug)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  activeSlug === t.slug
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {featured.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No products in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href={activeSlug ? `/shop?category=${activeSlug}` : "/shop"}
            className="inline-flex items-center gap-2 bg-[#1A0536] hover:bg-[#2D1B4E] text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
