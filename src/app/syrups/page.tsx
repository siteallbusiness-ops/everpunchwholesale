import { getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const syrupBrands = [
  { name: "MONIN", desc: "World's #1 syrup brand. 200+ flavours.", href: "#monin" },
  { name: "Sweetbird", desc: "Natural flavours for modern baristas.", href: "#sweetbird" },
  { name: "Simply", desc: "Great taste at a great price.", href: "#simply" },
  { name: "Boba Lish", desc: "Authentic bubble tea syrups.", href: "#boba" },
];

export default function SyrupsPage() {
  const items = getProductsByCategory("syrups");

  return (
    <>
      <PageHeader
        title="Flavouring Syrups, Purees & Sauces"
        subtitle="Over 200 flavours from MONIN, Sweetbird, Simply and more. Perfect for coffee, cocktails, bubble tea and desserts."
        crumbs={[{ label: "Syrups & Flavourings" }]}
      />
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Brand quick-links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {syrupBrands.map((b) => (
            <Link key={b.name} href={b.href} className="bg-white border border-gray-200 hover:border-emerald-300 rounded-xl p-4 group transition-all">
              <div className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-1">{b.name}</div>
              <div className="text-xs text-gray-500">{b.desc}</div>
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </>
  );
}
