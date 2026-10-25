"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageUpload from "@/components/ImageUpload";
import { PortfolioItem } from "@/lib/data-store";
import { Plus, Edit2, Trash2, Check, X, Search, Sparkles, Eye, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    imageUrl: "",
    category: "Handcrafted Furniture",
    client: "",
    completionDate: "",
    dimensions: "",
    materials: "",
    featured: false,
    published: true,
  });

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      imageUrl: "",
      category: "Handcrafted Furniture",
      client: "",
      completionDate: "",
      dimensions: "",
      materials: "",
      featured: false,
      published: true,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category,
      client: item.client || "",
      completionDate: item.completionDate || "",
      dimensions: item.dimensions || "",
      materials: item.materials || "",
      featured: item.featured,
      published: item.published,
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

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingItem ? prev.slug : generateSlug(val),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);

    try {
      const url = editingItem ? `/api/portfolio/${editingItem.id}` : "/api/portfolio";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        fetchItems();
      } else {
        setFormError(data.error || "Failed to save portfolio item");
      }
    } catch {
      setFormError("A network error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this portfolio item?")) return;
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFeatured = async (item: PortfolioItem) => {
    try {
      const res = await fetch(`/api/portfolio/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !item.featured }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((p) => (p.id === item.id ? { ...p, featured: !p.featured } : p))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const togglePublished = async (item: PortfolioItem) => {
    try {
      const res = await fetch(`/api/portfolio/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !item.published }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((p) => (p.id === item.id ? { ...p, published: !p.published } : p))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCat = categoryFilter === "All" || item.category === categoryFilter;
    const matchesSearch =
      search.trim() === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-screen">
      <AdminSidebar />

      <main className="flex-1 flex flex-col bg-stone-50/50">
        <AdminHeader
          title="Portfolio Management"
          subtitle="Add, edit, upload photos, and organize catalog items"
          actionButton={{
            label: "Add Portfolio Item",
            onClick: handleOpenAdd,
          }}
        />

        <div className="p-6 sm:p-8 space-y-6 flex-1">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200">
            <div className="flex flex-wrap items-center gap-2">
              {["All", "Handmade Clothing", "Baby & Kids", "Family Sets", "Home Decor", "Gifts & Accessories"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoryFilter(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    categoryFilter === c
                      ? "bg-amber-900 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search portfolio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-800"
              />
            </div>
          </div>

          {/* Items Table / Cards */}
          {loading ? (
            <div className="py-20 text-center text-xs text-stone-500">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-amber-800 mb-2" />
              Loading portfolio items...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
              <p className="text-stone-500 text-sm">No portfolio items found.</p>
              <button
                onClick={handleOpenAdd}
                className="text-xs font-bold text-amber-900 hover:underline"
              >
                + Create your first portfolio item
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
                      <th className="py-3.5 px-4">Item</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4 text-center">Featured</th>
                      <th className="py-3.5 px-4 text-center">Published</th>
                      <th className="py-3.5 px-4">Client</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-stone-50/70 transition">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-stone-900 text-sm font-serif line-clamp-1">
                                {item.title}
                              </div>
                              <span className="text-[11px] text-stone-400 font-mono">
                                /portfolio/{item.slug}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 font-medium text-[11px]">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => toggleFeatured(item)}
                            className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                              item.featured
                                ? "bg-amber-100 text-amber-900"
                                : "bg-stone-100 text-stone-400 hover:text-stone-600"
                            }`}
                            title="Toggle featured status"
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => togglePublished(item)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition ${
                              item.published
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-stone-200 text-stone-600"
                            }`}
                          >
                            {item.published ? "Active" : "Draft"}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-stone-600 text-xs">
                          {item.client || "—"}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/portfolio/${item.slug}`}
                              target="_blank"
                              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
                              title="Preview on live site"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleOpenEdit(item)}
                              className="p-1.5 text-stone-400 hover:text-amber-800 rounded-lg hover:bg-stone-100"
                              title="Edit item"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 text-stone-400 hover:text-red-700 rounded-lg hover:bg-stone-100"
                              title="Delete item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add / Edit Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-stone-200 my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-stone-900 font-serif mb-1">
              {editingItem ? "Edit Portfolio Work" : "Add New Portfolio Work"}
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Fill in project details and upload high-resolution workshop photography.
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
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Claro Walnut Dining Table"
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Slug (URL Key) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="claro-walnut-dining-table"
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 font-mono"
                  />
                </div>
              </div>

              {/* Photo Upload with live preview & file browser */}
              <ImageUpload
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                label="Portfolio Image"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                  >
                    <option value="Handmade Clothing">Handmade Clothing</option>
                    {/* <option value="Baby & Kids">Baby & Kids</option> */}
                    <option value="Family Sets">Family Sets</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Gifts & Accessories">Gifts & Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Client / Edition Name
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Jenkins Family Custom Order"
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                

                <div>
                  
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Completion Date
                  </label>
                  <input
                    type="text"
                    value={formData.completionDate}
                    onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                    placeholder="March 2026"
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Description & Case Study Narrative *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail the timber source, joinery methods, client specifications, and finishing oil..."
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                />
              </div>

              {/* Switches */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-amber-800 focus:ring-amber-800"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded text-amber-800 focus:ring-amber-800"
                  />
                  <span>Published (Visible to Public)</span>
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
                  {saving ? "Saving Record..." : editingItem ? "Update Item" : "Create Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
