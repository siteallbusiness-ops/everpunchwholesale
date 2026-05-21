"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import AddToBasketButton from "@/components/AddToBasketButton";
import type { Product } from "@/data/products";

const badgeColor: Record<string, string> = {
  "Best Seller": "bg-emerald-500",
  "Hot Deal": "bg-red-500",
  "New": "bg-violet-500",
  "Sale": "bg-red-500",
};

export default function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-emerald-200 transition-all flex flex-col h-full">
        {/* Image */}
        <div className="relative bg-gray-50 aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              -{product.discount}%
            </span>
            {product.badge && (
              <span className={`${badgeColor[product.badge] ?? "bg-gray-700"} text-white text-[10px] font-semibold px-2 py-0.5 rounded`}>
                {product.badge}
              </span>
            )}
          </div>
          {/* wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); setWished(!wished); }}
            className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Heart className={`w-3.5 h-3.5 ${wished ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
          </button>
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-3 flex flex-col gap-1.5 flex-1">
          <div className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wide">{product.brand}</div>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">{product.name}</h3>
          {product.packSize && (
            <div className="text-xs text-gray-500">{product.packSize}</div>
          )}

          {/* Stars */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`} />
              ))}
            </div>
            <span className="text-[10px] text-gray-500">({product.reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-auto pt-1">
            <span className="text-lg font-extrabold text-gray-900">£{product.salePrice.toFixed(2)}</span>
            <span className="text-xs text-gray-400 line-through">£{product.originalPrice.toFixed(2)}</span>
          </div>
          <div className="text-xs text-emerald-600 font-medium">
            You save £{(product.originalPrice - product.salePrice).toFixed(2)}
          </div>

          {/* CTA */}
          <AddToBasketButton
            productSlug={product.slug}
            disabled={!product.inStock}
            className="mt-2 w-full"
          />
        </div>
      </div>
    </Link>
  );
}
