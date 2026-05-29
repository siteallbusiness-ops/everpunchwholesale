"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, CreditCard } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

export default function CheckoutPage() {
  const { items, itemCount } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/order-failed"), 1800);
  }

  return (
    <>
      <PageHeader
        title="Checkout"
        subtitle="Complete your order below"
        crumbs={[{ label: "Basket", href: "/cart" }, { label: "Checkout" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <form onSubmit={handlePay}>
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left — delivery + payment */}
            <div className="lg:col-span-2 space-y-8">

              {/* Delivery address */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-bold text-gray-900 text-lg mb-5">Delivery Address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                    <input required type="text" placeholder="Jane" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                    <input required type="text" placeholder="Smith" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                    <input required type="email" placeholder="jane@example.com" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                    <input required type="tel" placeholder="07700 000000" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address line 1</label>
                    <input required type="text" placeholder="123 High Street" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address line 2 <span className="text-gray-400 font-normal">(optional)</span></label>
                    <input type="text" placeholder="Flat 2" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City / Town</label>
                    <input required type="text" placeholder="London" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                    <input required type="text" placeholder="SW1A 1AA" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
              </div>

              {/* Payment details */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-gray-900 text-lg">Payment Details</h2>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Lock className="w-3.5 h-3.5" />
                    Secure &amp; encrypted
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on card</label>
                    <input required type="text" placeholder="Jane Smith" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
                          e.target.value = digits.replace(/(.{4})/g, "$1 ").trim();
                        }}
                      />
                      <CreditCard className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry date</label>
                      <input
                        required
                        type="text"
                        placeholder="MM / YY"
                        maxLength={7}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
                          if (digits.length > 2) {
                            e.target.value = digits.slice(0, 2) + " / " + digits.slice(2);
                          } else {
                            e.target.value = digits;
                          }
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Security code (CVV)</label>
                      <input
                        required
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        onChange={(e) => {
                          e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
                <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  {lines.map(({ item, product, lineTotal }) => (
                    <div key={item.slug} className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg border border-gray-100 bg-gray-50 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 line-clamp-2">{product.name}</p>
                        <p className="text-xs text-gray-400">Qty {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">£{lineTotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-medium text-gray-900">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>VAT (20%)</span>
                    <span className="font-medium text-gray-900">£{vat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="font-medium text-emerald-600">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || lines.length === 0}
                  className="mt-5 w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Pay £{total.toFixed(2)}
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center mt-3">
                  Your payment is secured with 256-bit SSL encryption
                </p>
              </div>
            </div>

          </div>
        </form>
      </div>
    </>
  );
}
