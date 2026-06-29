import { getRefillChargerProducts } from "@/data/products";
import PageHeader from "@/components/PageHeader";
import CategoryProductListing, { type SubCategoryTab } from "@/components/CategoryProductListing";
import Link from "next/link";

const subCategories: SubCategoryTab[] = [
  { label: "N2O Refill", href: "#n2o", filterGas: "n2o" },
  { label: "CO2 Refill", href: "#co2", filterGas: "co2" },
  { label: "N2 Refill", href: "#n2", filterGas: "n2" },
  { label: "8g", href: "#8g", filterSize: "8g" },
  { label: "12g", href: "#12g", filterSize: "12g" },
  { label: "16g", href: "#16g", filterSize: "16g" },
  { label: "88g", href: "#88g", filterSize: "88g" },
  { label: "640g", href: "#640g", filterSize: "640g" },
  { label: "Bulk / Wholesale", href: "/wholesale" },
];

const FILTER_NOTICES: Record<string, string> = {
  "640g":
    "You can only purchase up to 3 single units without a verified company account. Cases of 6 and trade volumes require account verification or a wholesale enquiry.",
};

export default function CreamChargersPage() {
  const chargers = getRefillChargerProducts();

  return (
    <>
      <PageHeader
        title="Refill Chargers"
        subtitle="Premium quality N2O and CO2 refill chargers from the world's leading brands. Next day UK delivery on all orders."
        crumbs={[{ label: "Refill Chargers" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
          <span className="text-3xl">🫧</span>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-1">About Our Refill Chargers</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Food-grade N2O and CO2 refill chargers in 100% recyclable steel cartridges.
              N2O for whipped cream, mousses and espumas; CO2 for soda siphons and carbonation.
              Compatible with all standard dispensers and siphons.
            </p>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-2xl font-extrabold text-emerald-500">From £7.49</div>
            <div className="text-xs text-gray-500">per 24-pack</div>
          </div>
        </div>

        <div className="bg-[#1A0536] text-white rounded-xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-bold mb-1">Bulk &amp; wholesale orders</h3>
            <p className="text-sm text-gray-300">
              High-volume and trade pricing is enquiry only — not available to purchase online.
            </p>
          </div>
          <Link
            href="/wholesale"
            className="shrink-0 inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Request a quote
          </Link>
        </div>

        <CategoryProductListing
          products={chargers}
          subCategories={subCategories}
          filterNotices={FILTER_NOTICES}
          emptyMessage="No refill chargers match this filter. Try another option or view all."
        />

        <div className="mt-14 max-w-3xl">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "What is the difference between 8g and 8.5g chargers?",
                a: "8g is the standard size and fits all dispensers. 8.5g chargers contain slightly more N2O, giving better output per charger — ideal for high-volume use.",
              },
              {
                q: "Are your refill chargers food grade?",
                a: "Yes. All chargers are made from 100% recyclable food-grade steel and contain pharmaceutical-grade N2O.",
              },
              {
                q: "Do you offer trade / wholesale pricing?",
                a: "Yes. Bulk and wholesale orders are quote-only — submit an enquiry on our wholesale page and our team will respond with trade pricing.",
              },
            ].map((faq) => (
              <details key={faq.q} className="bg-white border border-gray-200 rounded-lg">
                <summary className="px-5 py-4 font-semibold text-gray-900 cursor-pointer hover:text-emerald-600 transition-colors">
                  {faq.q}
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
