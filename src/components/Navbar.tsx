"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Search, ShoppingCart, User, Menu, X, ChevronDown, Phone, Heart,
} from "lucide-react";
import { contact } from "@/config/contact";

const navLinks = [
  {
    label: "Refill Chargers",
    href: "/cream-chargers",
    sub: ["8g", "12g", "16g", "88g", "200g", "640g", "Fast Gas Cylinders"],
  },
  {
    label: "Dispensers",
    href: "/cream-dispensers",
    sub: ["0.5L Dispensers", "1L Dispensers", "Parts & Accessories"],
  },
  {
    label: "Syrups",
    href: "/syrups",
    sub: ["MONIN", "Sweetbird", "Simply", "Purees & Sauces"],
  },
  {
    label: "Coffee",
    href: "/coffee",
    sub: ["Coffee Beans", "Pods", "Milk Alternatives"],
  },
  { label: "Bar Supplies", href: "/bar-supplies", sub: [] },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [signinOpen, setSigninOpen] = useState(false);
  const signinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (signinRef.current && !signinRef.current.contains(e.target as Node)) {
        setSigninOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top utility bar */}
      <div className="bg-[#2D1B4E] text-gray-300 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-emerald-400" />
            {contact.phone} (TBC)
          </span>
          <div className="flex gap-5">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-emerald-500 text-white font-black text-xs px-2 py-1 rounded leading-tight">
              EVER<br />PUNCH
            </div>
            <div className="hidden sm:block">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">UK #1</div>
              <div className="text-xs font-bold text-gray-800 -mt-0.5">Barista & Bartender Supply</div>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for refill chargers, syrups, dispensers..."
                className="w-full pl-4 pr-14 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 transition-colors"
              />
              <button className="absolute right-0 top-0 bottom-0 bg-emerald-500 hover:bg-emerald-600 px-4 rounded-r-lg transition-colors">
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-1 ml-auto md:ml-0">
            {/* Account with sign-in dropdown */}
            <div className="relative hidden md:block" ref={signinRef}>
              <button
                onClick={() => setSigninOpen((v) => !v)}
                className="flex flex-col items-center gap-0.5 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-[10px] text-gray-500">Account</span>
              </button>

              {signinOpen && (
                <div className="absolute right-0 top-full mt-1 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Sign in</h3>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Please enter your email"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                    <input
                      type="password"
                      placeholder="Please enter your password"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                    <button className="w-full bg-[#1A0536] hover:bg-[#2D1B4E] text-white font-bold py-2.5 rounded-lg transition-colors text-sm">
                      Login
                    </button>
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-emerald-600">
                    <Link href="/account/register" className="hover:underline" onClick={() => setSigninOpen(false)}>
                      Create account
                    </Link>
                    <Link href="/account/reset-password" className="hover:underline" onClick={() => setSigninOpen(false)}>
                      Reset password
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="/wishlist" className="hidden md:flex flex-col items-center gap-0.5 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
              <span className="text-[10px] text-gray-500">Wishlist</span>
            </Link>
            <Link href="/cart" className="flex flex-col items-center gap-0.5 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors relative">
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </div>
              <span className="text-[10px] text-gray-500 hidden md:block">Basket</span>
            </Link>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <div className="bg-[#1A0536] hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.sub.length > 0 && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap text-gray-300 hover:text-white hover:bg-white/5"
                >
                  {link.label}
                  {link.sub.length > 0 && (
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  )}
                </Link>

                {link.sub.length > 0 && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 bg-white shadow-xl rounded-b-lg border border-gray-100 min-w-[200px] py-2 z-50">
                    {link.sub.map((sub) => (
                      <Link
                        key={sub}
                        href={`${link.href}#${sub.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 divide-y divide-gray-100">
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-12 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block px-4 py-3 text-sm font-medium text-gray-700"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
