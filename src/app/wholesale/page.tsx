"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { CheckCircle, Building2, Package } from "lucide-react";
import { contact } from "@/config/contact";

export default function WholesalePage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <PageHeader
        title="Bulk & Wholesale Enquiries"
        subtitle="Trade and high-volume orders are quote-only. Tell us what you need and our team will respond with pricing — no online checkout for bulk orders."
        crumbs={[{ label: "Bulk & Wholesale" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Enquiry only</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Bulk and wholesale refill charger orders are not available to purchase online.
                Submit an enquiry and we will contact you with trade pricing and availability.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Building2,
                  title: "Who we supply",
                  desc: "Cafés, bars, restaurants, catering companies, distributors and resellers across the UK.",
                },
                {
                  icon: Package,
                  title: "What to include",
                  desc: "Product types, pack sizes (8g–640g), brands if relevant, and estimated monthly volume.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500">
              Prefer email?{" "}
              <a href={`mailto:${contact.email}`} className="text-emerald-600 hover:underline font-medium">
                {contact.email}
              </a>
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              {sent ? (
                <div className="flex flex-col items-center text-center gap-4 py-8">
                  <CheckCircle className="w-12 h-12 text-emerald-500" />
                  <h3 className="text-xl font-bold text-gray-900">Enquiry Received</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Thank you. Our wholesale team will review your request and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-emerald-500 hover:underline text-sm font-medium"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-lg font-bold text-gray-900">Request a Quote</h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input required type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input required type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                    <input required type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 transition-colors" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input required type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 transition-colors" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input required type="tel" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 transition-colors" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Products of interest *</label>
                    <select required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 transition-colors">
                      <option value="">Select...</option>
                      <option>Refill Chargers — 8g</option>
                      <option>Refill Chargers — 12g</option>
                      <option>Refill Chargers — 16g</option>
                      <option>Refill Chargers — 88g</option>
                      <option>Refill Chargers — 200g</option>
                      <option>Refill Chargers — 640g</option>
                      <option>Multiple sizes / mixed order</option>
                      <option>Other bar & kitchen supplies</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estimated monthly volume</label>
                    <input
                      type="text"
                      placeholder="e.g. 50 cases per month"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional details *</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                      placeholder="Brands, delivery location, timeline, or any other requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Submit Enquiry
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    For standard retail orders,{" "}
                    <Link href="/shop" className="text-emerald-600 hover:underline">
                      shop online
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
