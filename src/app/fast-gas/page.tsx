import { getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";

export default function FastGasPage() {
  const items = getProductsByCategory("fast-gas");

  return (
    <>
      <PageHeader
        title="Fast Gas — N2O Cylinders"
        subtitle="Large N2O cylinders for high-volume professional use. Replaces hundreds of individual chargers — more cost effective, less waste."
        crumbs={[{ label: "Fast Gas" }]}
      />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-5 mb-8">
          <h3 className="font-bold text-violet-900 mb-1">⚡ Why Choose Fast Gas Cylinders?</h3>
          <p className="text-sm text-violet-800">
            A 580g N2O cylinder replaces approximately 72 standard 8g chargers — saving you money and reducing packaging waste.
            Ideal for busy professional kitchens, catering companies and high-volume bakeries.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </>
  );
}
