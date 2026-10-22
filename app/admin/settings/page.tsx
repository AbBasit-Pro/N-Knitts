"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { SiteSettingsData, SocialLinkItem } from "@/lib/data-store";
import { Save, CheckCircle2, AlertCircle, Loader2, Globe, Building2, Phone, Mail, Clock, Share2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettingsData>({
    businessName: "",
    tagline: "",
    email: "",
    phone: "",
    address: "",
    operatingHours: "",
    aboutText: "",
    updatedAt: "",
  });
  const [socialLinks, setSocialLinks] = useState<SocialLinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        setSocialLinks(data.socialLinks || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings, socialLinks }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFeedback({ type: "success", text: "Website settings saved successfully!" });
      } else {
        setFeedback({ type: "error", text: data.error || "Failed to save settings." });
      }
    } catch {
      setFeedback({ type: "error", text: "Network error occurred." });
    } finally {
      setSaving(false);
    }
  };

  const updateSocialUrl = (id: number, url: string) => {
    setSocialLinks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, url } : s))
    );
  };

  const toggleSocialEnabled = (id: number) => {
    setSocialLinks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isEnabled: !s.isEnabled } : s))
    );
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-screen">
      <AdminSidebar />

      <main className="flex-1 flex flex-col bg-stone-50/50">
        <AdminHeader
          title="Website & Business Settings"
          subtitle="Configure brand information, contact coordinates, operating hours, and social media channels"
        />

        <div className="p-6 sm:p-8 space-y-6 flex-1 max-w-4xl">
          {feedback && (
            <div
              className={`p-4 rounded-xl flex items-center gap-2.5 text-xs ${
                feedback.type === "success"
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              )}
              <span>{feedback.text}</span>
            </div>
          )}

          {loading ? (
            <div className="py-20 text-center text-xs text-stone-500">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-amber-800 mb-2" />
              Loading settings...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* General Business Information */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                  <Building2 className="w-4 h-4 text-amber-800" />
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    Business Profile & Branding
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.businessName}
                      onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Tagline / Subtitle *
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.tagline}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    About / Mission Statement *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={settings.aboutText}
                    onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 leading-relaxed"
                  />
                </div>
              </div>

              {/* Contact Coordinates */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                  <Phone className="w-4 h-4 text-amber-800" />
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    Contact Coordinates & Location
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Telephone *
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Physical Studio / Workshop Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Hours of Operation *
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.operatingHours}
                    onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                  />
                </div>
              </div>

              {/* Social Channels */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                  <Share2 className="w-4 h-4 text-amber-800" />
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    Social Media Profiles
                  </h3>
                </div>

                <div className="space-y-3">
                  {socialLinks.map((s) => (
                    <div key={s.id} className="flex items-center gap-4">
                      <span className="w-24 text-xs font-bold text-stone-700">{s.platform}</span>
                      <input
                        type="url"
                        value={s.url}
                        onChange={(e) => updateSocialUrl(s.id, e.target.value)}
                        className="flex-1 px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                      />
                      <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-stone-600 shrink-0">
                        <input
                          type="checkbox"
                          checked={s.isEnabled}
                          onChange={() => toggleSocialEnabled(s.id)}
                          className="rounded text-amber-800 focus:ring-amber-800"
                        />
                        <span>Active</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-semibold text-xs shadow-md transition flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Settings...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save All Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
