export default function USPSection() {
  const usps = [
    {
      icon: "🚚",
      title: "Next Day Delivery",
      desc: "Order before 4pm Monday–Friday and get your order the very next working day, UK-wide.",
    },
    {
      icon: "✅",
      title: "100% Genuine Products",
      desc: "Every product is sourced directly from the official manufacturer. No fakes, no surprises.",
    },
    {
      icon: "💰",
      title: "Lowest UK Prices",
      desc: "We buy in bulk so you don't have to. Price-matched against all major UK competitors.",
    },
    {
      icon: "♻️",
      title: "Eco-Friendly Packaging",
      desc: "All N2O chargers are 100% recyclable steel. We offset our delivery carbon emissions.",
    },
    {
      icon: "📞",
      title: "Expert UK Support",
      desc: "Talk to real people. Trade accounts and bulk enquiries welcome.",
    },
    {
      icon: "⭐",
      title: "Trustpilot Excellent",
      desc: "Over 50,000 happy customers and counting. Read genuine reviews on Trustpilot.",
    },
  ];

  return (
    <section className="py-14 bg-[#1A0536]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-white">Why Choose EverPunch?</h2>
          <p className="text-gray-400 mt-2 text-sm">The UK&apos;s most trusted barista &amp; bartender supply company since 2009</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {usps.map((u) => (
            <div
              key={u.title}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 hover:border-emerald-500/30 transition-all"
            >
              <div className="text-3xl mb-3">{u.icon}</div>
              <h3 className="font-bold text-white mb-1.5">{u.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{u.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
