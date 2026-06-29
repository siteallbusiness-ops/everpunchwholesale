import Link from "next/link";
import HashLink from "@/components/HashLink";
import { Phone, Mail, MapPin, Globe, Share2, Rss, MessageSquareShare } from "lucide-react";
import { contact } from "@/config/contact";

const footerSections = [
  {
    title: "Refill Chargers",
    links: [
      { label: "N2O Refill", href: "/cream-chargers#n2o" },
      { label: "CO2 Refill", href: "/cream-chargers#co2" },
      { label: "N2 Refill", href: "/cream-chargers#n2" },
      { label: "8g", href: "/cream-chargers#8g" },
      { label: "12g", href: "/cream-chargers#12g" },
      { label: "16g", href: "/cream-chargers#16g" },
      { label: "88g", href: "/cream-chargers#88g" },
      { label: "640g", href: "/cream-chargers#640g" },
      { label: "Bulk / Wholesale", href: "/wholesale" },
    ],
  },
  {
    title: "Equipment",
    links: [
      { label: "Cream Dispensers", href: "/cream-dispensers" },
      { label: "Soda Siphons", href: "/bar-supplies" },
      { label: "CO2 Refill Cartridges", href: "/cream-chargers#co2" },
      { label: "Bar Supplies", href: "/bar-supplies" },
      { label: "Accessories", href: "/cream-dispensers" },
    ],
  },
  {
    title: "Drinks & Flavours",
    links: [
      { label: "MONIN Syrups", href: "/syrups#monin" },
      { label: "Sweetbird Syrups", href: "/syrups#sweetbird" },
      { label: "Simply Syrups", href: "/syrups#simply" },
      { label: "Purees & Sauces", href: "/syrups#purees-sauces" },
      { label: "Coffee & Blends", href: "/coffee#beans" },
      { label: "Milk Alternatives", href: "/coffee#milk-alternatives" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Delivery Info", href: "/delivery-info" },
      { label: "Returns Policy", href: "/returns-policy" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

const paymentMethods = ["Visa", "Mastercard", "PayPal", "Apple Pay", "Klarna", "AMEX"];
const certifications = ["Verified ★★★★★", "SSL Secure", "UK Registered"];

export default function Footer() {
  return (
    <footer className="bg-[#1A0536] text-gray-400">
      {/* USP strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🚚", title: "Next Day Delivery", sub: "Order before 4pm" },
            { icon: "✅", title: "Genuine Products", sub: "Official UK distributor" },
            { icon: "🔒", title: "Secure Checkout", sub: "SSL encrypted" },
            { icon: "🔄", title: "Easy Returns", sub: "Hassle-free 30 days" },
          ].map((u) => (
            <div key={u.title} className="flex items-center gap-3">
              <span className="text-2xl">{u.icon}</span>
              <div>
                <div className="text-sm font-semibold text-white">{u.title}</div>
                <div className="text-xs">{u.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2 space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="bg-emerald-500 text-white font-black text-xs px-2 py-1 rounded leading-tight">
                  EVER<br />PUNCH
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">UK #1</div>
                  <div className="text-xs font-bold text-gray-300">Barista & Bartender Supply</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
                The UK&apos;s leading distributor of refill chargers, dispensers, flavouring syrups
                and professional bar supplies. Trusted by over 50,000 customers since 2009.
              </p>
            </div>

            <div className="space-y-2">
              {[
                { icon: Phone, text: contact.phone },
                { icon: Mail, text: contact.email, href: `mailto:${contact.email}` },
                { icon: MapPin, text: contact.address },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-2 text-sm">
                  <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                  {href ? (
                    <a href={href} className="hover:text-white transition-colors">{text}</a>
                  ) : (
                    <span>{text}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              {[Globe, Share2, Rss, MessageSquareShare].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 bg-white/5 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((sec) => (
            <div key={sec.title}>
              <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-4">{sec.title}</h4>
              <ul className="space-y-2">
                {sec.links.map((link) => (
                  <li key={link.label}>
                    {link.href.includes("#") ? (
                      <HashLink
                        href={link.href}
                        className="text-sm hover:text-emerald-400 transition-colors"
                      >
                        {link.label}
                      </HashLink>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm hover:text-emerald-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Payment methods */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-600 mr-1">We accept:</span>
            {paymentMethods.map((pm) => (
              <span key={pm} className="bg-white/5 border border-white/10 text-gray-400 text-xs px-3 py-1 rounded font-medium">
                {pm}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {certifications.map((c) => (
              <span key={c} className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 text-center py-4 text-xs text-gray-600">
        © {new Date().getFullYear()} EverPunch Ltd. All rights reserved. Registered in England & Wales.
        All N2O products sold for culinary use only in compliance with UK law.
      </div>
    </footer>
  );
}
