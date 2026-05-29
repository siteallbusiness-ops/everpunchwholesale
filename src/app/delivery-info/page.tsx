import PageHeader from "@/components/PageHeader";
import { Truck, Clock, MapPin, Package } from "lucide-react";

export default function DeliveryInfoPage() {
  return (
    <>
      <PageHeader
        title="Delivery Information"
        subtitle="Everything you need to know about how we get your order to you."
        crumbs={[{ label: "Delivery Info" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">

        {/* Key stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Truck, title: "Next Day Delivery", body: "Order before 4pm Mon–Fri for guaranteed next working day delivery." },
            { icon: Clock, title: "Order Cut-off", body: "Orders placed after 4pm will be dispatched the following working day." },
            { icon: MapPin, title: "UK Wide", body: "We deliver to all mainland UK addresses. See below for remote areas." },
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

        {/* Delivery options table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-[#1A0536] text-white px-6 py-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-400" />
              Delivery Options & Costs
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { service: "Standard Delivery", time: "2–3 Working Days", cost: "£3.99" },
              { service: "Next Day Delivery", time: "Next Working Day", cost: "£5.99" },
              { service: "Free Delivery", time: "2–3 Working Days", cost: "Free on orders over £30" },
            ].map((row) => (
              <div key={row.service} className="grid grid-cols-3 px-6 py-4 text-sm">
                <span className="font-semibold text-gray-900">{row.service}</span>
                <span className="text-gray-500">{row.time}</span>
                <span className="text-emerald-600 font-medium">{row.cost}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Additional Information</h2>
          <div className="space-y-4">
            {[
              {
                q: "Do you deliver to Northern Ireland, Scotland Highlands & Islands?",
                a: "Yes, but delivery times may be extended by 1–2 working days and additional charges may apply. You will be notified at checkout if a surcharge applies to your postcode.",
              },
              {
                q: "Can I track my order?",
                a: "Yes. Once your order has been dispatched you will receive a confirmation email with a tracking link. You can also log in to your account to view the status of your order.",
              },
              {
                q: "What happens if I miss my delivery?",
                a: "Our couriers will leave a card and attempt redelivery the following working day, or you can arrange a convenient redelivery date using the tracking link in your dispatch email.",
              },
              {
                q: "Do you offer international delivery?",
                a: "We currently deliver to mainland UK only. We hope to offer international shipping in the future — please contact us if you have a specific enquiry.",
              },
            ].map((faq) => (
              <details key={faq.q} className="bg-white border border-gray-200 rounded-lg">
                <summary className="px-5 py-4 font-semibold text-gray-900 cursor-pointer hover:text-emerald-600 transition-colors">
                  {faq.q}
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
