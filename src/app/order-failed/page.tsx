import Link from "next/link";
import { XCircle, Phone, Mail } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function OrderFailedPage() {
  return (
    <>
      <PageHeader
        title="Order Could Not Be Completed"
        crumbs={[{ label: "Basket", href: "/cart" }, { label: "Checkout", href: "/checkout" }, { label: "Order Status" }]}
      />

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-5" />

          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
            Sorry, your order could not be completed
          </h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto mb-8">
            There was a problem processing your payment. You have not been charged.
            Please contact us and we&apos;ll get this sorted for you right away.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="tel:+441234000000"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
            <a
              href="/contact"
              className="flex items-center gap-2 border border-gray-300 hover:border-emerald-500 hover:text-emerald-600 text-gray-700 font-bold px-6 py-3 rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </a>
          </div>

          <Link
            href="/cart"
            className="text-sm text-emerald-600 hover:underline font-medium"
          >
            ← Return to basket
          </Link>
        </div>
      </div>
    </>
  );
}
