"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ContactFormProps {
  defaultSubject?: string;
}

export default function ContactForm({ defaultSubject = "" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: defaultSubject,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFeedback(data.message || "Thank you! Your message has been received.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("error");
        setFeedback(data.error || "Failed to send your message. Please check the fields and try again.");
      }
    } catch {
      setStatus("error");
      setFeedback("A network error occurred while submitting. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 sm:p-10 border border-stone-200 shadow-sm">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-stone-900 font-serif mb-2">
          Custom Order Inquiry & Consultation
        </h3>
        <p className="text-sm text-stone-600">
          Share your idea, preferred colors, yarn type, or sizing. We will get back to you with design suggestions, pricing, and timelines within 24 hours.
        </p>
      </div>

      {status === "success" ? (
        <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h4 className="text-lg font-bold text-emerald-900 font-serif">Message Dispatched</h4>
          <p className="text-sm text-emerald-700 max-w-md mx-auto">{feedback}</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 transition"
          >
            Send Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {status === "error" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-xs text-red-700">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Full Name <span className="text-amber-800">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sarah Jenkins"
                className="w-full px-4 py-2.5 text-sm bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Email Address <span className="text-amber-800">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="sarah@example.com"
                className="w-full px-4 py-2.5 text-sm bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 234-5678"
                className="w-full px-4 py-2.5 text-sm bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Project Subject <span className="text-amber-800">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Matching Family Beanies (Set of 4)"
                className="w-full px-4 py-2.5 text-sm bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Custom Order Details & Preferred Colors <span className="text-amber-800">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us what you'd like made (e.g. baby sweater, knit scarf, custom colors, size, yarn preference, or target delivery date)..."
              className="w-full px-4 py-2.5 text-sm bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 transition"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-900 text-white font-semibold text-sm hover:bg-amber-800 shadow-md hover:shadow-lg disabled:opacity-50 transition"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Inquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Custom Order Request</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
