import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { RotateCcw, CheckCircle, XCircle, Mail } from "lucide-react";

export default function ReturnsPolicyPage() {
  return (
    <>
      <PageHeader
        title="Returns Policy"
        subtitle="We want you to be completely satisfied with your purchase. Here's how our returns process works."
        crumbs={[{ label: "Returns Policy" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">

        {/* Summary cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: RotateCcw, title: "30-Day Returns", body: "Return most items within 30 days of delivery for a full refund or exchange." },
            { icon: CheckCircle, title: "Easy Process", body: "Simply contact us and we'll arrange a free returns label for eligible items." },
            { icon: Mail, title: "Fast Refunds", body: "Refunds are processed within 5 working days of us receiving your return." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* What can / can't be returned */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Eligible for Return
            </h3>
            <ul className="space-y-2 text-sm text-emerald-800">
              {[
                "Unopened, unused items in original packaging",
                "Faulty or damaged goods (any time)",
                "Incorrectly dispatched items",
                "Dispensers and accessories (unused)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              Not Eligible for Return
            </h3>
            <ul className="space-y-2 text-sm text-red-800">
              {[
                "Opened or used charger products",
                "Perishable food items (syrups, coffee once opened)",
                "Items returned after 30 days without prior agreement",
                "Products damaged due to misuse",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-bold text-gray-900 text-lg mb-6">How to Return an Item</h2>
          <ol className="space-y-5">
            {[
              { step: "1", title: "Contact Us", body: "Get in touch via our contact page or email within 30 days of receiving your order. Please include your order number and reason for return." },
              { step: "2", title: "Receive Return Authorisation", body: "We'll review your request and issue a Return Authorisation (RA) number along with return instructions, usually within 1 working day." },
              { step: "3", title: "Send the Item Back", body: "Pack the item securely and include your RA number inside the parcel. Drop it at your nearest post office or arrange a courier collection." },
              { step: "4", title: "Refund or Exchange", body: "Once we receive and inspect your return, your refund will be processed to the original payment method within 5 working days." },
            ].map(({ step, title, body }) => (
              <li key={step} className="flex gap-4">
                <div className="w-8 h-8 bg-emerald-500 text-white text-sm font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  {step}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <div className="bg-[#1A0536] text-white rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-bold mb-1">Need to start a return?</h3>
            <p className="text-sm text-gray-300">Our team is here to help — get in touch and we&apos;ll sort it out quickly.</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </>
  );
}
