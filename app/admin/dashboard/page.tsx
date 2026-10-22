import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import { getDashboardStats, getMessages, getReviews, getPortfolioItems } from "@/lib/data-store";
import { ArrowRight, Star, Mail } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [stats, messages, reviews, portfolio] = await Promise.all([
    getDashboardStats(),
    getMessages(),
    getReviews(),
    getPortfolioItems(),
  ]);

  const recentMessages = messages.slice(0, 4);
  const recentReviews = reviews.slice(0, 3);

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-screen">
      <AdminSidebar />

      <main className="flex-1 flex flex-col bg-stone-50/50">
        <AdminHeader
          title="Executive Dashboard"
          subtitle="Real-time studio activity, customer inquiries, and catalog management"
        />

        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Portfolio Works"
              value={stats.totalPortfolio}
              subtitle={`${stats.publishedPortfolio} active and visible online`}
              icon="ImageIcon"
              href="/admin/portfolio"
            />
            <StatCard
              title="Bespoke Services"
              value={stats.totalServices}
              subtitle={`${stats.activeServices} published offerings`}
              icon="Briefcase"
              href="/admin/services"
            />
            <StatCard
              title="Customer Reviews"
              value={stats.totalReviews}
              badge={stats.pendingReviews > 0 ? `${stats.pendingReviews} Pending` : undefined}
              subtitle={stats.pendingReviews > 0 ? "Requires admin moderation" : "All reviews moderated"}
              icon="Star"
              href="/admin/reviews"
            />
            <StatCard
              title="Client Inquiries"
              value={stats.totalMessages}
              badge={stats.unreadMessages > 0 ? `${stats.unreadMessages} Unread` : undefined}
              subtitle={stats.unreadMessages > 0 ? "Pending customer replies" : "All messages read"}
              icon="Mail"
              href="/admin/messages"
            />
          </div>

          {/* Quick Shortcuts */}
          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900 font-serif">Quick Actions</h3>
              <p className="text-xs text-stone-500">Fast workflows to manage your website content</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/admin/portfolio"
                className="px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold rounded-xl shadow-xs transition"
              >
                + Add Portfolio Work
              </Link>
              <Link
                href="/admin/services"
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold rounded-xl transition"
              >
                + Add Service
              </Link>
              <Link
                href="/admin/messages"
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition"
              >
                View Inquiries ({stats.unreadMessages})
              </Link>
              <Link
                href="/admin/settings"
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition"
              >
                Website Settings
              </Link>
            </div>
          </div>

          {/* Activity Tables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Contact Messages */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-800" />
                  <h3 className="text-sm font-bold text-stone-900 font-serif">Recent Commission Inquiries</h3>
                </div>
                <Link
                  href="/admin/messages"
                  className="text-xs font-bold text-amber-900 hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {recentMessages.length === 0 ? (
                <p className="text-xs text-stone-400 py-6 text-center">No messages received yet.</p>
              ) : (
                <div className="space-y-3">
                  {recentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3.5 rounded-xl border text-xs transition ${
                        !msg.isRead
                          ? "bg-amber-50/50 border-amber-200"
                          : "bg-stone-50/50 border-stone-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-stone-900">{msg.name}</span>
                        {!msg.isRead ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold">
                            Unread
                          </span>
                        ) : (
                          <span className="text-stone-400 text-[10px]">Read</span>
                        )}
                      </div>
                      <div className="font-medium text-stone-800 mb-1">{msg.subject}</div>
                      <p className="text-stone-500 line-clamp-1">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Reviews Moderation */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-800" />
                  <h3 className="text-sm font-bold text-stone-900 font-serif">Customer Reviews</h3>
                </div>
                <Link
                  href="/admin/reviews"
                  className="text-xs font-bold text-amber-900 hover:underline flex items-center gap-1"
                >
                  <span>Moderate All</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {recentReviews.length === 0 ? (
                <p className="text-xs text-stone-400 py-6 text-center">No customer reviews yet.</p>
              ) : (
                <div className="space-y-3">
                  {recentReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/50 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900">{rev.customerName}</span>
                        <div className="flex items-center gap-1 text-amber-500">
                          {"★".repeat(rev.rating)}
                        </div>
                      </div>
                      <p className="text-stone-600 line-clamp-2 italic">&ldquo;{rev.review}&rdquo;</p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-stone-400">{rev.role || "Client"}</span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            rev.isApproved
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {rev.isApproved ? "Approved & Live" : "Pending Moderation"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
