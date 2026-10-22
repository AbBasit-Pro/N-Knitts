"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { ServiceItem } from "@/lib/data-store";
import { Plus, Edit2, Trash2, Check, X, Loader2, AlertCircle, Briefcase } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    icon: "Table",
    category: "Furniture",
    features: "",
    isActive: true,
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/services");
      const data = await res.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      price: "Starting at $45",
      icon: "Shirt",
      category: "Clothing",
      features: "Handmade with premium yarn\nCustom measurements available\nGentle care guide included",
      isActive: true,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (svc: ServiceItem) => {
    setEditingService(svc);
    setFormData({
      title: svc.title,
      slug: svc.slug,
      description: svc.description,
      price: svc.price,
      icon: svc.icon,
      category: svc.category,
      features: svc.features.join("\n"),
      isActive: svc.isActive,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);

    try {
      const url = editingService ? `/api/services/${editingService.id}` : "/api/services";
      const method = editingService ? "PUT" : "POST";

      const payload = {
        ...formData,
        features: formData.features.split("\n").map((f) => f.trim()).filter(Boolean),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        fetchServices();
      } else {
        setFormError(data.error || "Failed to save service");
      }
    } catch {
      setFormError("A network error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleStatus = async (svc: ServiceItem) => {
    try {
      const res = await fetch(`/api/services/${svc.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !svc.isActive }),
      });
      if (res.ok) {
        setServices((prev) =>
          prev.map((s) => (s.id === svc.id ? { ...s, isActive: !s.isActive } : s))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-screen">
      <AdminSidebar />

      <main className="flex-1 flex flex-col bg-stone-50/50">
        <AdminHeader
          title="Services Management"
          subtitle="Configure business offerings, pricing tiers, and discipline descriptions"
          actionButton={{
            label: "Add Service",
            onClick: handleOpenAdd,
          }}
        />

        <div className="p-6 sm:p-8 space-y-6 flex-1">
          {loading ? (
            <div className="py-20 text-center text-xs text-stone-500">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-amber-800 mb-2" />
              Loading services...
            </div>
          ) : services.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
              <p className="text-stone-500 text-sm">No services created yet.</p>
              <button
                onClick={handleOpenAdd}
                className="text-xs font-bold text-amber-900 hover:underline"
              >
                + Add your first service
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-stone-100 text-stone-700">
                        {svc.category}
                      </span>
                      <button
                        onClick={() => toggleStatus(svc)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition ${
                          svc.isActive
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-stone-200 text-stone-600"
                        }`}
                      >
                        {svc.isActive ? "Active Offering" : "Disabled"}
                      </button>
                    </div>

                    <h3 className="text-lg font-bold text-stone-900 font-serif mb-1">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-amber-900 font-semibold mb-3">{svc.price}</p>
                    <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-2">
                      {svc.description}
                    </p>

                    <div className="space-y-1 mb-4 pt-3 border-t border-stone-100">
                      {svc.features.map((f, i) => (
                        <div key={i} className="text-[11px] text-stone-500 flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-amber-700 shrink-0" />
                          <span className="truncate">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(svc)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition flex items-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(svc.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 transition flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-stone-200 my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-stone-900 font-serif mb-1">
              {editingService ? "Edit Service" : "Add New Service"}
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Configure description, pricing starting rate, and included feature bullets.
            </p>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        title: val,
                        slug: editingService ? prev.slug : generateSlug(val),
                      }));
                    }}
                    placeholder="e.g. Bespoke Dining Tables"
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Furniture"
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Price / Starting Rate *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Starting at $3,200"
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Icon Theme
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                  >
                    <option value="Shirt">Handmade Clothing (Shirt)</option>
                    <option value="Gift">Personalized Gifts (Gift)</option>
                    <option value="Baby">Baby & Kids Collection (Baby)</option>
                    <option value="Users">Family Sets (Users)</option>
                    <option value="Palette">Custom Colors & Designs (Palette)</option>
                    <option value="Scissors">Knitting Repairs (Scissors)</option>
                    <option value="Package">Bulk Orders (Package)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive service description..."
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Features (One feature per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Custom dimension matching&#10;Zero-VOC hardwax oil&#10;Lifetime warranty"
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 font-mono"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded text-amber-800 focus:ring-amber-800"
                  />
                  <span>Active & Visible to Public</span>
                </label>
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
                  disabled={saving}
                  className="px-5 py-2 text-xs font-semibold bg-amber-900 text-white rounded-xl hover:bg-amber-800 disabled:opacity-50 transition"
                >
                  {saving ? "Saving..." : editingService ? "Update Service" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
