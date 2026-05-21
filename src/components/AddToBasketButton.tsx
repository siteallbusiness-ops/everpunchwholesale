"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

type Props = {
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
};

export default function AddToBasketButton({
  disabled = false,
  size = "sm",
  className = "",
}: Props) {
  const [added, setAdded] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || added) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const sizeClasses =
    size === "md"
      ? "py-3 rounded-lg text-base gap-2"
      : "py-2 rounded text-sm gap-1.5";

  const iconSize = size === "md" ? "w-5 h-5" : "w-3.5 h-3.5";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center justify-center font-semibold transition-all ${sizeClasses} ${
        added
          ? "bg-emerald-600 text-white"
          : "bg-emerald-500 hover:bg-emerald-600 text-white"
      } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed ${className}`}
    >
      {added ? (
        <>
          <Check className={iconSize} />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className={iconSize} />
          Add to Basket
        </>
      )}
    </button>
  );
}
