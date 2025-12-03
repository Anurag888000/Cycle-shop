"use client";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  MessageCircle,
  Package,
  Wrench,
  Info,
  HelpCircle,
} from "lucide-react";
import AnimatedHero from "@/components/AnimatedHero";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "bulk_order", // Focused on Bulk Order by default
    bulkCategory: "bicycles",
    quantity: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phone = "918090529034";
    let text = `*New Inquiry via Website*\n\n`;
    text += `*Name:* ${formData.name}\n`;
    text += `*Email:* ${formData.email}\n`;
    text += `*Type:* ${getInquiryLabel(formData.inquiryType)}\n`;

    if (formData.inquiryType === "bulk_order") {
      text += `*Category:* ${
        formData.bulkCategory === "parts" ? "Spare Parts" : "Bicycles"
      }\n`;
      text += `*Quantity:* ${formData.quantity} Units\n`;
    }

    text += `\n*Message:* ${formData.message}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const getInquiryLabel = (type: string) => {
    switch (type) {
      case "bulk_order":
        return "Bulk Order";
      case "service":
        return "🔧 Service & Repair";
      case "support":
        return "🛟 Customer Support";
      case "info":
        return "ℹ️ General Information";
      default:
        return type;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Animated Hero Banner */}
      <AnimatedHero
        title="Get in Touch"
        subtitle="Need a repair, spare parts, or looking to place a bulk order? We're here to help."
        variant="secondary"
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column: Contact Info */}
          <div className="space-y-8">
            <div className="prose dark:prose-invert">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Visit Our Shop
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                We are located in Bhognipur. Drop by for expert advice or huge
                savings on bulk bicycle orders.
              </p>
            </div>

            <div className="grid gap-6">
              <ContactCard
                icon={<MapPin className="w-6 h-6" />}
                title="Address"
                content="Bhognipur, Kanpur Dehat, Uttar Pradesh, India 209111"
                action={{
                  label: "View on Map",
                  href: "https://maps.google.com/?q=Bhognipur,Kanpur+Dehat,Uttar+Pradesh,India",
                }}
              />
              <ContactCard
                icon={<Phone className="w-6 h-6" />}
                title="Phone / WhatsApp"
                content="+91 80905 29034"
                action={{
                  label: "Call Now",
                  href: "tel:+918090529034",
                }}
              />
              <ContactCard
                icon={<Mail className="w-6 h-6" />}
                title="Email"
                content="mr.sam9900@gmail.com"
                action={{
                  label: "Send Email",
                  href: "mailto:mr.sam9900@gmail.com",
                }}
              />
              <ContactCard
                icon={<Clock className="w-6 h-6" />}
                title="Business Hours"
                content={
                  <div className="space-y-2 text-sm">
                    <div>
                      <span>Mon – Sat</span>
                      <span className="text-gray-400 dark:text-gray-500 mx-2">
                        :
                      </span>
                      <span>10:00 AM – 8:00 PM</span>
                    </div>
                    <div>
                      <span>Sunday</span>
                      <span className="text-gray-400 dark:text-gray-500 mx-2">
                        :
                      </span>
                      <span className="text-red-500 font-semibold">Closed</span>
                    </div>
                  </div>
                }
              />
            </div>
          </div>

          {/* Right Column: WhatsApp Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 h-fit sticky top-24">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-green-500" />
              Chat on WhatsApp
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Inquiry Type Selection */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "bulk_order", label: "Bulk Order", icon: Package },
                  { id: "service", label: "Service", icon: Wrench },
                  { id: "support", label: "Support", icon: HelpCircle },
                  { id: "info", label: "Info", icon: Info },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, inquiryType: item.id })
                    }
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      formData.inquiryType === item.id
                        ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500"
                        : "bg-gray-50 dark:bg-gray-700/50 border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 mb-1 ${
                        formData.inquiryType === item.id
                          ? "text-indigo-600 dark:text-indigo-400"
                          : ""
                      }`}
                    />
                    <span className="text-xs font-bold">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Conditional Bulk Order Fields */}
              {formData.inquiryType === "bulk_order" && (
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/50 space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div>
                    <label className="block text-xs font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wide mb-2">
                      I want to order
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="bulkCategory"
                          value="bicycles"
                          checked={formData.bulkCategory === "bicycles"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bulkCategory: e.target.value,
                            })
                          }
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Bicycles
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="bulkCategory"
                          value="parts"
                          checked={formData.bulkCategory === "parts"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bulkCategory: e.target.value,
                            })
                          }
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Spare Parts
                        </span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wide mb-2">
                      Quantity (Approx)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 50"
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 focus:ring-2 focus:ring-indigo-500 outline-none text-sm dark:text-white"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Standard Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition dark:text-white"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition dark:text-white"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition dark:text-white resize-none"
                  placeholder="Tell us more about your requirements..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/40 transition-all flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Send via WhatsApp
              </button>
              <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                We usually reply within 1 hour.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

function ContactCard({ icon, title, content, action }: any) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl hover:bg-white hover:dark:bg-gray-800 transition duration-300 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 group">
      <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white mb-1">
          {title}
        </h4>
        <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {content}
        </div>
        {action && (
          <a
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
          >
            {action.label} <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </div>
  );
}
