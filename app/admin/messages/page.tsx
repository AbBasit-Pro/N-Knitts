"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { MessageItem } from "@/lib/data-store";
import { Mail, Check, Trash2, Reply, Eye, Loader2, X, Phone, User, Calendar } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleRead = async (msg: MessageItem) => {
    try {
      const res = await fetch(`/api/messages/${msg.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !msg.isRead }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, isRead: !m.isRead } : m))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this message?")) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenDetail = (msg: MessageItem) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      toggleRead(msg);
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-screen">
      <AdminSidebar />

      <main className="flex-1 flex flex-col bg-stone-50/50">
        <AdminHeader
          title="Commission Inquiries & Messages"
          subtitle="Customer inquiries sent through the public website contact form"
        />

        <div className="p-6 sm:p-8 space-y-6 flex-1">
          {loading ? (
            <div className="py-20 text-center text-xs text-stone-500">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-amber-800 mb-2" />
              Loading inquiries...
            </div>
          ) : messages.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500 text-sm">
              No inquiries received yet. Form submissions will appear here.
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="divide-y divide-stone-100">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:bg-stone-50/70 ${
                      !msg.isRead ? "bg-amber-50/30 font-medium" : ""
                    }`}
                  >
                    <div
                      className="cursor-pointer space-y-1 flex-1"
                      onClick={() => handleOpenDetail(msg)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">{msg.name}</span>
                        {!msg.isRead ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold">
                            New
                          </span>
                        ) : (
                          <span className="text-[10px] text-stone-400">Read</span>
                        )}
                        <span className="text-[11px] text-stone-400">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-stone-800">{msg.subject}</div>
                      <p className="text-xs text-stone-500 line-clamp-1">{msg.message}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenDetail(msg)}
                        className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                      <a
                        href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: ${msg.subject}`)}`}
                        className="px-3 py-1.5 rounded-lg bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold transition flex items-center gap-1.5"
                      >
                        <Reply className="w-3.5 h-3.5" />
                        <span>Reply</span>
                      </a>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-700 hover:bg-red-50 transition"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Message View Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-stone-200">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Inquiry Details
                </span>
                <h3 className="text-xl font-bold text-stone-900 font-serif mt-1">
                  {selectedMessage.subject}
                </h3>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-stone-700">
                  <User className="w-3.5 h-3.5 text-stone-400" />
                  <span className="font-semibold">{selectedMessage.name}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <a href={`mailto:${selectedMessage.email}`} className="text-amber-900 hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>
                {selectedMessage.phone && (
                  <div className="flex items-center gap-2 text-stone-700">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <a href={`tel:${selectedMessage.phone}`} className="hover:underline">
                      {selectedMessage.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-stone-400 text-[11px]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Received on {new Date(selectedMessage.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-stone-700 mb-2">Message Body</h4>
                <div className="p-4 bg-stone-50/70 border border-stone-200 rounded-xl text-xs text-stone-800 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  Delete Message
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                  >
                    Close
                  </button>
                  <a
                    href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(`Re: ${selectedMessage.subject}`)}`}
                    className="px-5 py-2 text-xs font-semibold bg-amber-900 text-white rounded-xl hover:bg-amber-800 transition flex items-center gap-1.5"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
