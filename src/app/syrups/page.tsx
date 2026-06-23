import { getProductsByCategory } from "@/data/products";
import PageHeader from "@/components/PageHeader";
import CategoryProductListing, { type SubCategoryTab } from "@/components/CategoryProductListing";
import HashLink from "@/components/HashLink";

const subCategories: SubCategoryTab[] = [
  { label: "MONIN", href: "#monin", filterKey: "monin" },
  { label: "Sweetbird", href: "#sweetbird", filterKey: "sweetbird" },
  { label: "Simply", href: "#simply", filterKey: "simply" },
  { label: "Purees & Sauces", href: "#purees-sauces", filterKey: "purees-sauces" },
];

const syrupBrands = [
  { name: "MONIN", desc: "World's #1 syrup brand. 200+ flavours.", href: "/syrups#monin" },
  { name: "Sweetbird", desc: "Natural flavours for modern baristas.", href: "/syrups#sweetbird" },
  { name: "Simply", desc: "Great taste at a great price.", href: "/syrups#simply" },
  { name: "Purees & Sauces", desc: "Fruit purees and gourmet sauces.", href: "/syrups#purees-sauces" },
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {syrupBrands.map((b) => (
            <HashLink
              key={b.name}
              href={b.href}
              className="bg-white border border-gray-200 hover:border-emerald-300 rounded-xl p-4 group transition-all"
            >
              <div className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-1">
                {b.name}
              </div>
              <div className="text-xs text-gray-500">{b.desc}</div>
            </HashLink>
          ))}
        </div>

        <CategoryProductListing
          products={items}
          subCategories={subCategories}
          filterMode="syrup"
          emptyMessage="No syrups match this filter. Try another brand or view all."
        />
      </div>
    </>
  );
}
