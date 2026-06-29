"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import AddToBasketButton from "@/components/AddToBasketButton";
import {
  get640gCylinderVariants,
  isSingleUnit640gCylinder,
  SINGLE_UNIT_640G_LIMIT,
  type Product,
} from "@/data/products";
import { useCart } from "@/context/CartContext";

type Props = {
  product: Product;
};

export default function ProductPurchasePanel({ product }: Props) {
  const { countSingle640gUnits } = useCart();
  const [quantity, setQuantity] = useState(1);

  const variants = product.is640gCylinder
    ? [product, ...get640gCylinderVariants(product)].sort((a, b) => {
        if (a.packOption === "single") return -1;
        if (b.packOption === "single") return 1;
        return 0;
      })
    : [];

  const isLimitedSingle = isSingleUnit640gCylinder(product);
  const inCartSingle640g = countSingle640gUnits();
  const remainingAllowance = Math.max(0, SINGLE_UNIT_640G_LIMIT - inCartSingle640g);
  const maxQuantity = isLimitedSingle ? remainingAllowance : 99;
  const atLimit = isLimitedSingle && remainingAllowance <= 0;

  function changeQuantity(delta: number) {
    setQuantity((current) => {
      const next = current + delta;
      if (next < 1) return 1;
      if (isLimitedSingle && next > maxQuantity) return Math.max(1, maxQuantity);
      return Math.min(next, 99);
    });
  }

  return (
    <div className="space-y-5">
      {product.is640gCylinder && variants.length > 1 && (
        <div>
          <div className="text-xs text-gray-500 mb-2">Pack size</div>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => {
              const isActive = variant.slug === product.slug;
              const label = variant.packOption === "case-of-6" ? "Case of 6" : "1 unit";
              return (
                <Link
                  key={variant.slug}
                  href={`/products/${variant.slug}`}
                  className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                    isActive
                      ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 text-gray-700 hover:border-emerald-400 hover:text-emerald-600"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {isLimitedSingle && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-900">
          You can only purchase up to {SINGLE_UNIT_640G_LIMIT} single units without a verified
          company account.
          {remainingAllowance > 0 && remainingAllowance < SINGLE_UNIT_640G_LIMIT && (
            <span className="block mt-1 text-amber-800">
              You can add {remainingAllowance} more single unit
              {remainingAllowance === 1 ? "" : "s"} to your basket.
            </span>
          )}
          {atLimit && (
            <span className="block mt-1 font-semibold text-amber-900">
              Single-unit limit reached. Choose a case of 6 or verify your company account to
              order more.
            </span>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => changeQuantity(-1)}
            disabled={quantity <= 1}
            className="w-10 h-12 text-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40"
          >
            −
          </button>
          <span className="w-10 text-center font-semibold text-gray-900">{quantity}</span>
          <button
            type="button"
            onClick={() => changeQuantity(1)}
            disabled={isLimitedSingle ? quantity >= maxQuantity : quantity >= 99}
            className="w-10 h-12 text-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40"
          >
            +
          </button>
        </div>
        <AddToBasketButton
          productSlug={product.slug}
          quantity={quantity}
          disabled={!product.inStock || atLimit}
          size="md"
          className="flex-1 font-bold"
        />
        <button
          type="button"
          className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center hover:border-red-300 hover:text-red-500 transition-colors"
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
