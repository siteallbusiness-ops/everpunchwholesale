import { brands, getBrandBySlug, getProductsByBrand } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const items = getProductsByBrand(brand.name);

  return (
    <>
      <PageHeader
        title={brand.name}
        subtitle={brand.description}
        crumbs={[
          { label: "Brands", href: "/brands" },
          { label: brand.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center gap-5 mb-8 p-5 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="w-16 h-16 rounded-xl bg-[#1A0536] flex items-center justify-center shrink-0">
            <span className="text-white font-extrabold text-base">{brand.logo}</span>
          </div>
          <div>
            <p className="text-sm text-gray-600">{brand.description}</p>
            <p className="text-sm font-semibold text-emerald-600 mt-1">
              {items.length} product{items.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">No products listed for this brand yet.</p>
            <Link
              href="/shop"
              className="text-emerald-500 hover:text-emerald-700 font-semibold text-sm"
            >
              Browse all products →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
