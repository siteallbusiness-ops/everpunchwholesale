"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, itemCount } = useCart();

  const lines = items
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      if (!product) return null;
      return { item, product, lineTotal: product.salePrice * item.quantity };
    })
    .filter(Boolean) as {
    item: { slug: string; quantity: number };
    product: (typeof products)[0];
    lineTotal: number;
  }[];

  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);

  return (
    <>
      <PageHeader
        title="Your Basket"
        subtitle={
          itemCount > 0
            ? `${itemCount} item${itemCount !== 1 ? "s" : ""} in your basket`
            : "Your basket is empty"
        }
        crumbs={[{ label: "Basket" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {lines.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your basket is empty</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
              Browse our range and add products to your basket to checkout.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-3 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              {lines.map(({ item, product, lineTotal }) => (
                <div
                  key={item.slug}
                  className="flex gap-4 p-4 bg-white border border-gray-200 rounded-xl"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="w-24 h-24 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-semibold text-gray-900 hover:text-emerald-600 text-sm line-clamp-2"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-emerald-600 font-medium mt-0.5">{product.brand}</p>
                    <p className="text-sm font-bold text-gray-900 mt-2">
                      £{product.salePrice.toFixed(2)}
                      <span className="text-xs font-normal text-gray-400"> each</span>
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900">£{lineTotal.toFixed(2)}</span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={clearCart}
                className="text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                Clear basket
              </button>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
                <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-semibold text-gray-900">£{subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400 mb-4">Ex VAT · Delivery calculated at checkout</p>
                <Link
                  href="/checkout"
                  className="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors mb-3"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/shop"
                  className="block w-full text-center text-sm text-emerald-600 hover:underline font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
