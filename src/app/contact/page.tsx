"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { contact } from "@/config/contact";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Our UK-based team is here to help. Get in touch with any questions, trade enquiries or order support."
        crumbs={[{ label: "Contact" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Info column */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Get In Touch</h2>
              <div className="space-y-4">
                {[
                  { icon: Phone, label: "Phone", value: contact.phone, sub: "TBC" },
                  { icon: Mail, label: "Email", value: contact.email, sub: "We aim to reply within 2 hours" },
                  { icon: MapPin, label: "Address", value: contact.address, sub: "Registered in England & Wales" },
                ].map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
                      <div className="font-semibold text-gray-900 text-sm mt-0.5">{value}</div>
                      <div className="text-xs text-gray-500">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trade enquiries */}
          
          </div>

          {/* Contact form */}
          <div className="md:col-span-3">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              {sent ? (
                <div className="flex flex-col items-center text-center gap-4 py-8">
                  <CheckCircle className="w-12 h-12 text-emerald-500" />
                  <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Thank you for getting in touch. Our team will get back to you within 2 working hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-emerald-500 hover:underline text-sm font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-lg font-bold text-gray-900">Send Us a Message</h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input required type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input required type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input required type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 transition-colors" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 transition-colors" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <select required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 transition-colors">
                      <option value="">Select a subject...</option>
                      <option>Order Query</option>
                      <option>Delivery Issue</option>
                      <option>Returns / Refund</option>
                      <option>Product Information</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    By submitting this form you agree to our Privacy Policy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
