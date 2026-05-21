import { Suspense } from "react";
import { products } from "@/data/products";
import PageHeader from "@/components/PageHeader";
import ShopProductListing from "@/components/ShopProductListing";

export default function ShopPage() {
  return (
    <>
      <PageHeader
        title="Shop All Products"
        subtitle="Over 2,000 products from the UK's leading barista and bartender supply brands"
        crumbs={[{ label: "Shop" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Suspense fallback={<p className="text-sm text-gray-500">Loading products…</p>}>
          <ShopProductListing products={products} />
        </Suspense>
      </div>
    </>
  );
}
