import PageHeader from "@/components/PageHeader";
import { Shield, Truck, Users, Award, Leaf, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About EverPunch"
        subtitle="The UK's #1 Barista & Bartender Supply Company since 2009"
        crumbs={[{ label: "About Us" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-emerald-500 font-semibold text-xs uppercase tracking-widest mb-2">Our Story</p>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
              The UK&apos;s Leading Distributor in Modern Gastronomy
            </h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                Founded in 2009, EverPunch has grown from a small online retailer to the UK&apos;s #1
                distributor of N2O refill chargers, cream dispensers, flavouring syrups and professional
                bar supplies.
              </p>
              <p>
                We work directly with manufacturers including Pro Whip, iSi, MOSA, MONIN and Lavazza to
                bring you genuine, certified products at the most competitive prices in the UK.
              </p>
              <p>
                From independent coffee shops and cocktail bars to Michelin-starred restaurants and
                home bakers — over 50,000 customers across the UK trust EverPunch for their
                professional supplies.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { number: "50,000+", label: "Happy Customers", icon: Users },
              { number: "15+", label: "Years of Service", icon: Clock },
              { number: "2,000+", label: "Products", icon: Award },
              { number: "30+", label: "Top Brands", icon: Shield },
            ].map(({ number, label, icon: Icon }) => (
              <div key={label} className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
                <Icon className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                <div className="text-2xl font-extrabold text-gray-900">{number}</div>
                <div className="text-xs text-gray-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="bg-[#1A0536] rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-extrabold text-white text-center mb-8">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Genuine Products", desc: "We source directly from manufacturers. Every product is 100% authentic." },
              { icon: Truck, title: "Speed & Reliability", desc: "Next day delivery on orders before 4pm. Reliable, tracked shipping UK-wide." },
              { icon: Leaf, title: "Sustainability", desc: "All N2O steel chargers are fully recyclable. We offset our carbon footprint." },
              { icon: Users, title: "Customer First", desc: "Real UK-based support. Trade accounts welcome. Wholesale pricing available." },
              { icon: Award, title: "Quality Assured", desc: "All products meet EU food safety standards. Certified and tested." },
              { icon: Clock, title: "Experience", desc: "Over 15 years serving professional kitchens, bars and baristas across the UK." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-bold text-amber-900 mb-2">Important — Legal Notice</h3>
          <p className="text-sm text-amber-800 leading-relaxed">
            All N2O products sold by EverPunch Ltd are intended for culinary use only,
            specifically for the preparation of whipped cream, mousses, and other food items
            in professional or domestic kitchen settings. We comply fully with the Psychoactive
            Substances Act 2016 and the Nitrous Oxide regulations in the UK.
            We do not sell to anyone under the age of 18.
            Quality limit restrictions apply to individual purchases.
          </p>
        </div>
      </div>
    </>
  );
}
