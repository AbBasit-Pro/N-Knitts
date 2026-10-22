"use client";

import { useState } from "react";
import { ReviewItem } from "@/lib/data-store";
import { Star, MessageSquarePlus, CheckCircle2, AlertCircle, X } from "lucide-react";

interface ReviewsProps {
  reviews: ReviewItem[];
  showSubmitModal?: boolean;
}

export default function Reviews({ reviews, showSubmitModal = true }: ReviewsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    rating: 5,
    role: "",
    review: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "Thank you! Your review has been submitted for moderation.");
        setFormData({ customerName: "", rating: 5, role: "", review: "" });
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to submit review.");
      }
    } catch {
      setStatus("error");
      setMessage("A network error occurred. Please try again.");
    }
  };

  return (
    <div className="space-y-12">
      {/* Top CTA to submit a review */}
      {showSubmitModal && (
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 gap-4">
          <div>
            <h3 className="text-base font-bold text-stone-900 font-serif">
              Have you ordered from N-Knitts?
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              We treasure feedback from our customers, gift recipients, and families.
            </p>
          </div>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setStatus("idle");
              setMessage("");
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-semibold text-xs shadow-sm transition shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Client Review</span>
          </button>
        </div>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rev.rating
                        ? "text-amber-500 fill-amber-500"
                        : "text-stone-300"
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-stone-700 text-sm leading-relaxed mb-6 italic">
                &ldquo;{rev.review}&rdquo;
              </p>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
              {rev.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={rev.image}
                  alt={rev.customerName}
                  className="w-10 h-10 rounded-full object-cover border border-amber-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-sm">
                  {rev.customerName[0]}
                </div>
              )}
              <div>
                <h4 className="text-sm font-bold text-stone-900">{rev.customerName}</h4>
                <p className="text-xs text-stone-500">{rev.role || "Commission Client"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-stone-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-stone-900 font-serif mb-2">
              Share Your Experience
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Your review helps others discover authentic Northwest woodworking. Reviews are published following moderation.
            </p>

            {status === "success" ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-stone-900">Review Submitted!</h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">{message}</p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 px-5 py-2 text-xs font-semibold bg-stone-900 text-white rounded-xl"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === "error" && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{message}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Project or City (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Dining Table Client, Lake Oswego"
                      className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Rating *
                    </label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                    >
                      <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                      <option value={4}>★★★★☆ (4 Stars - Great)</option>
                      <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                      <option value={2}>★★☆☆☆ (2 Stars - Needs Improvement)</option>
                      <option value={1}>★☆☆☆☆ (1 Star - Poor)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Review & Experience *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    placeholder="Describe the craftsmanship, process, communication, and finished piece..."
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-5 py-2 text-xs font-semibold bg-amber-900 text-white rounded-xl hover:bg-amber-800 disabled:opacity-50 transition"
                  >
                    {status === "loading" ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
