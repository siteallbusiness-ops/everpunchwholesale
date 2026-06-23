import { getProductsByCategory } from "@/data/products";
import PageHeader from "@/components/PageHeader";
import CategoryProductListing, { type SubCategoryTab } from "@/components/CategoryProductListing";

const subCategories: SubCategoryTab[] = [
  { label: "Coffee Beans", href: "#beans", filterKey: "beans" },
  { label: "Pods", href: "#pods", filterKey: "pods" },
  { label: "Milk Alternatives", href: "#milk-alternatives", filterKey: "milk-alternatives" },
];

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
        <CategoryProductListing
          products={items}
          subCategories={subCategories}
          filterMode="coffee"
          emptyMessage="No coffee products match this filter. Try another category or view all."
        />
      </div>
    </>
  );
}
