"use client";

import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, CheckCircle, AlertCircle, Loader2, Link2, X } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Portfolio Image" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"file" | "url">("file");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPEG, PNG, WEBP, AVIF, GIF).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size exceeds the 10MB limit.");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success && data.url) {
        onChange(data.url);
      } else {
        setError(data.error || "Upload failed. Try entering an image URL directly.");
      }
    } catch {
      setError("Network error during file upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-stone-700">
          {label} <span className="text-amber-800">*</span>
        </label>
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setMode("file")}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition ${
              mode === "file" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-900"
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition ${
              mode === "url" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-900"
            }`}
          >
            Direct URL
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Preview Box if image is set */}
      {value ? (
        <div className="relative rounded-xl border border-stone-200 overflow-hidden bg-stone-50 p-2 flex items-center gap-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-stone-200 shrink-0 border border-stone-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mb-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Image Attached</span>
            </div>
            <p className="text-[11px] text-stone-500 truncate">{value}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onChange("");
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="absolute top-3 right-3 p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-stone-100"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : mode === "file" ? (
        /* File Upload Drop Area */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer border-2 border-dashed border-stone-300 hover:border-amber-700 hover:bg-amber-50/20 rounded-2xl p-6 text-center transition space-y-2"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="w-8 h-8 text-amber-800 animate-spin" />
              <p className="text-xs text-stone-600 font-medium">Validating & uploading photo...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-800">
                  Click to browse or drop workshop photo here
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  JPEG, PNG, WEBP, AVIF up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Direct Image URL input */
        <div className="relative">
          <div className="relative">
            <Link2 className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
            />
          </div>
          <p className="text-[11px] text-stone-500 mt-1">
            Paste any public image URL (e.g. Unsplash, Cloudinary, Imgur).
          </p>
        </div>
      )}
    </div>
  );
}
