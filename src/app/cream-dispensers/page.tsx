import { getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";

export default function CreamDispensersPage() {
  const items = getProductsByCategory("cream-dispensers");

  return (
    <>
      <PageHeader
        title="Cream Dispensers & Whippers"
        subtitle="Professional cream whippers and siphons from iSi, Pro Whip, MOSA and more. Works hot and cold."
        crumbs={[{ label: "Cream Dispensers" }]}
      />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
          <h3 className="font-bold text-emerald-900 mb-1">🍶 Choosing a Cream Dispenser</h3>
          <p className="text-sm text-emerald-800">
            For home use, a 0.5L dispenser is ideal. For professional kitchens or high-volume use,
            the 1L stainless steel models are recommended. All our dispensers are compatible with standard
            8g N2O refill chargers.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </>
  );
}
