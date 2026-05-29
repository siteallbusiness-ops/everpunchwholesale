import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, Star } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="bg-[#1A0536] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
              ⚡ UK&apos;s #1 Barista &amp; Bartender Supply
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Premium N2O Chargers
              <br />
              <span className="text-emerald-400">At Wholesale Prices</span>
            </h1>
            <p className="text-gray-400 text-base leading-relaxed max-w-lg">
              Over 2,000 products from the world&apos;s leading brands. Refill chargers, dispensers,
              flavouring syrups and bar supplies — delivered next day across the UK.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Shop All Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-5 pt-2 text-sm">
              {[
                { icon: Truck, text: "Next Day Delivery" },
                { icon: ShieldCheck, text: "Genuine Products" },
                { icon: Star, text: "50,000+ Customers" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-gray-400">
                  <Icon className="w-4 h-4 text-emerald-400" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — promo boxes */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Refill Chargers", sub: "From £7.49 / 24 pack", href: "/cream-chargers", bg: "from-emerald-600 to-emerald-800", icon: "🫧" },
              { label: "Bar Supplies", sub: "CO2, siphons & more", href: "/bar-supplies", bg: "from-violet-600 to-violet-800", icon: "🍹" },
              { label: "MONIN Syrups", sub: "200+ flavours", href: "/syrups", bg: "from-teal-600 to-teal-800", icon: "🍯" },
              { label: "Cream Dispensers", sub: "Pro grade, all brands", href: "/cream-dispensers", bg: "from-indigo-700 to-indigo-900", icon: "🍶" },
            ].map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className={`bg-gradient-to-br ${c.bg} rounded-xl p-5 flex flex-col justify-between min-h-[130px] hover:scale-[1.02] transition-transform shadow-lg`}
              >
                <span className="text-3xl">{c.icon}</span>
                <div>
                  <div className="font-bold text-white text-sm">{c.label}</div>
                  <div className="text-white/70 text-xs mt-0.5">{c.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
