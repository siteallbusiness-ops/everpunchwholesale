import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const sections = [
  {
    title: "1. Who We Are",
    body: `EverPunch Ltd ("EverPunch", "we", "us", "our") is the data controller for the personal information we collect through this website. We are registered in England & Wales. If you have any questions about how we handle your data, please contact us at the details below.`,
  },
  {
    title: "2. Information We Collect",
    body: `We collect information you provide directly — such as your name, email address, delivery address, phone number and payment details when you place an order or create an account. We also collect information automatically when you use our website, including your IP address, browser type, pages visited and cookies.`,
  },
  {
    title: "3. How We Use Your Information",
    body: `We use your personal information to process and fulfil your orders, send order confirmations and delivery updates, manage your account, respond to customer service enquiries, and improve our website. With your consent, we may also send you promotional emails about products and offers. You can opt out at any time.`,
  },
  {
    title: "4. Sharing Your Information",
    body: `We share your information with third parties only where necessary to fulfil our services — including payment processors, delivery couriers and IT service providers. We do not sell your personal data to third parties. All third parties are required to keep your information secure and use it only for the specified purpose.`,
  },
  {
    title: "5. Payment Security",
    body: `All payment transactions are encrypted using SSL technology. We do not store full card details on our servers. Payments are processed by a PCI-DSS compliant payment provider.`,
  },
  {
    title: "6. Cookies",
    body: `Our website uses cookies to improve your browsing experience, remember your basket contents and analyse website traffic. You can control cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our website.`,
  },
  {
    title: "7. Data Retention",
    body: `We retain your personal data for as long as necessary to fulfil the purposes for which it was collected, including for legal, accounting or reporting requirements. Order records are typically retained for 7 years. You may request deletion of your data at any time, subject to legal obligations.`,
  },
  {
    title: "8. Your Rights",
    body: `Under UK data protection law you have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your data; object to or restrict processing of your data; request a copy of your data in a portable format; and lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.`,
  },
  {
    title: "9. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.`,
  },
  {
    title: "10. Contact Us",
    body: `If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us via our Contact page.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        subtitle="Last updated: May 2025"
        crumbs={[{ label: "Privacy Policy" }]}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-10 text-sm text-emerald-800 leading-relaxed">
          Your privacy matters to us. This policy explains what personal data we collect, why we collect it, and how we use and protect it. Please read it carefully.
        </div>

        <div className="space-y-8">
          {sections.map(({ title, body }) => (
            <div key={title}>
              <h2 className="text-base font-bold text-gray-900 mb-2">{title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-gray-500">Questions about your data?</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
