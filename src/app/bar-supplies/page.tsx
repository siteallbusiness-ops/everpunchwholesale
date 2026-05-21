import { getProductsByCategory, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";

export default function BarSuppliesPage() {
  const items = getProductsByCategory("bar-supplies");
  const allItems = items.length ? items : products.slice(0, 4);

  return (
    <>
      <PageHeader
        title="Bar Supplies"
        subtitle="Professional cocktail tools, soda siphons, CO2 cartridges and bar accessories for every bartender"
        crumbs={[{ label: "Bar Supplies" }]}
      />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {allItems.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </>
  );
}
