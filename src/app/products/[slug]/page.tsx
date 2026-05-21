import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";
import { Heart, Star, Truck, Shield, RefreshCw, CheckCircle } from "lucide-react";
import AddToBasketButton from "@/components/AddToBasketButton";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <>
      <PageHeader
        crumbs={[
          { label: product.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), href: `/${product.category}` },
          { label: product.name },
        ]}
        title=""
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded">
                -{product.discount}% OFF
              </span>
              {product.badge && (
                <span className="bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div>
              <div className="text-emerald-500 font-semibold text-sm uppercase tracking-wide mb-1">{product.brand}</div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug">{product.name}</h1>
              {product.sku && <div className="text-xs text-gray-400 mt-1">SKU: {product.sku}</div>}
            </div>

            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`} />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-gray-900">£{product.salePrice.toFixed(2)}</span>
                <span className="text-lg text-gray-400 line-through">£{product.originalPrice.toFixed(2)}</span>
              </div>
              <div className="text-sm text-emerald-600 font-semibold mt-1">
                You save £{(product.originalPrice - product.salePrice).toFixed(2)} ({product.discount}% off)
              </div>
            </div>

            {/* Pack/weight */}
            {(product.packSize || product.weight) && (
              <div className="flex gap-3">
                {product.packSize && (
                  <div className="bg-gray-100 rounded-lg px-4 py-2 text-sm">
                    <div className="text-xs text-gray-500">Pack Size</div>
                    <div className="font-semibold text-gray-900">{product.packSize}</div>
                  </div>
                )}
                {product.weight && (
                  <div className="bg-gray-100 rounded-lg px-4 py-2 text-sm">
                    <div className="text-xs text-gray-500">Weight</div>
                    <div className="font-semibold text-gray-900">{product.weight}</div>
                  </div>
                )}
              </div>
            )}

            {/* Qty + Add to Basket */}
            <div className="flex gap-3">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button className="w-10 h-12 text-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors">−</button>
                <span className="w-10 text-center font-semibold text-gray-900">1</span>
                <button className="w-10 h-12 text-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors">+</button>
              </div>
              <AddToBasketButton
                productSlug={product.slug}
                disabled={!product.inStock}
                size="md"
                className="flex-1 font-bold"
              />
              <button className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center hover:border-red-300 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, text: "Next Day Delivery" },
                { icon: Shield, text: "Genuine Product" },
                { icon: RefreshCw, text: "Easy Returns" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1 bg-gray-50 rounded-lg p-3 text-center">
                  <Icon className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs text-gray-600 font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* Features */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Key Features</h3>
              <ul className="space-y-1.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12 border-t border-gray-200 pt-10">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
