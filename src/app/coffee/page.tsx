import { getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";

export default function CoffeePage() {
  const items = getProductsByCategory("coffee");

  return (
    <>
      <PageHeader
        title="Coffee & Barista Supplies"
        subtitle="Premium coffee beans, pods, milk alternatives and accessories from Lavazza, Alpro and more."
        crumbs={[{ label: "Coffee" }]}
      />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </>
  );
}
