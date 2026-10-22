"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { ReviewItem } from "@/lib/data-store";
import { Star, CheckCircle, XCircle, Trash2, Sparkles, Loader2, AlertCircle } from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id: number, approve: boolean) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: approve }),
      });
      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, isApproved: approve } : r))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleFeatured = async (id: number, current: boolean) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !current }),
      });
      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, isFeatured: !current } : r))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this customer review?")) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (filter === "pending") return !r.isApproved;
    if (filter === "approved") return r.isApproved;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-screen">
      <AdminSidebar />

      <main className="flex-1 flex flex-col bg-stone-50/50">
        <AdminHeader
          title="Customer Reviews Moderation"
          subtitle="Review client feedback submissions, approve testimonials, and pin featured quotes"
        />

        <div className="p-6 sm:p-8 space-y-6 flex-1">
          {/* Tab Filter */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-stone-200 w-fit">
            <button
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                filter === "all" ? "bg-amber-900 text-white" : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              All Reviews ({reviews.length})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                filter === "pending" ? "bg-amber-900 text-white" : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              Pending Moderation ({reviews.filter((r) => !r.isApproved).length})
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                filter === "approved" ? "bg-amber-900 text-white" : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              Approved ({reviews.filter((r) => r.isApproved).length})
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center text-xs text-stone-500">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-amber-800 mb-2" />
              Loading reviews...
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500 text-sm">
              No reviews match the selected filter.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-stone-900 text-sm">{rev.customerName}</span>
                      <div className="flex items-center text-amber-500 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? "fill-amber-500 text-amber-500" : "text-stone-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          rev.isApproved
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {rev.isApproved ? "Approved & Live" : "Pending Approval"}
                      </span>
                      {rev.isFeatured && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Featured on Home</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-stone-600 italic leading-relaxed">
                      &ldquo;{rev.review}&rdquo;
                    </p>

                    <div className="text-[11px] text-stone-400">
                      {rev.role || "Client"} • Submitted on {new Date(rev.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {!rev.isApproved ? (
                      <button
                        onClick={() => handleApprove(rev.id, true)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Approve & Publish</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApprove(rev.id, false)}
                        className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition flex items-center gap-1.5"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Unpublish</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleToggleFeatured(rev.id, rev.isFeatured)}
                      className={`p-2 rounded-xl text-xs font-semibold transition ${
                        rev.isFeatured
                          ? "bg-amber-100 text-amber-900"
                          : "bg-stone-100 text-stone-400 hover:text-stone-700"
                      }`}
                      title="Toggle homepage feature"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(rev.id)}
                      className="p-2 rounded-xl text-stone-400 hover:text-red-700 hover:bg-red-50 transition"
                      title="Delete review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
