
"use client";

import { useRef, useState } from "react";
import {
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
  Link2,
  X,
} from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

const MAX_FILE_SIZE = 4 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
];

export default function ImageUpload({
  value,
  onChange,
  label = "Portfolio Image",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"file" | "url">("file");
  const [previewError, setPreviewError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Select a JPEG, PNG, WEBP, AVIF, or GIF image.");
      e.target.value = "";
      return;
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      setError("Image size must be greater than 0 and at most 4 MB.");
      e.target.value = "";
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success || !data?.url) {
        setError(
          data?.error ||
            `Upload failed with status ${response.status}.`
        );
        return;
      }

      onChange(data.url);
      setPreviewError(false);
      setMode("file");
    } catch (err) {
      console.error("Image upload error:", err);
      setError(
        "Network error. Check your internet connection and try again."
      );
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleUrlChange = (url: string) => {
    onChange(url);
    setPreviewError(false);
    setError(null);
  };

  const handleRemove = () => {
    onChange("");
    setError(null);
    setPreviewError(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="block text-xs font-semibold text-stone-700">
          {label} <span className="text-amber-800">*</span>
        </label>

        <div className="flex items-center gap-1 rounded-lg bg-stone-100 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("file");
              setError(null);
            }}
            className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition ${
              mode === "file"
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-500 hover:text-stone-900"
            }`}
          >
            Upload File
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("url");
              setError(null);
            }}
            className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition ${
              mode === "url"
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-500 hover:text-stone-900"
            }`}
          >
            Direct URL
          </button>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {value ? (
        <div className="relative flex items-center gap-4 overflow-hidden rounded-xl border border-stone-200 bg-stone-50 p-3">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-stone-200 bg-stone-200">
            {!previewError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt="Portfolio image preview"
                className="h-full w-full object-cover"
                onError={() => setPreviewError(true)}
              />
            ) : (
              <div className="p-2 text-center text-[10px] text-stone-500">
                Image preview unavailable
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 pr-6">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Image Attached</span>
            </div>

            <p className="truncate text-[11px] text-stone-500">
              {value}
            </p>

            {previewError && (
              <button
                type="button"
                onClick={() => setPreviewError(false)}
                className="mt-1 text-[11px] text-amber-900 underline"
              >
                Retry preview
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleRemove}
            disabled={isUploading}
            className="absolute right-3 top-3 rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-red-600 disabled:opacity-50"
            title="Remove image"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : mode === "file" ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            if (!isUploading) fileInputRef.current?.click();
          }}
          onKeyDown={(e) => {
            if (
              !isUploading &&
              (e.key === "Enter" || e.key === " ")
            ) {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className={`rounded-2xl border-2 border-dashed border-stone-300 p-6 text-center transition ${
            isUploading
              ? "cursor-wait opacity-70"
              : "cursor-pointer hover:border-amber-700 hover:bg-amber-50/20"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_TYPES.join(",")}
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="h-8 w-8 animate-spin text-amber-800" />
              <p className="text-xs font-medium text-stone-600">
                Uploading image to cloud storage...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
                <Upload className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-bold text-stone-800">
                  Click to select an image
                </p>
                <p className="mt-1 text-[11px] text-stone-500">
                  JPEG, PNG, WEBP, AVIF, or GIF · Maximum 4 MB
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="relative">
            <Link2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

            <input
              type="url"
              value={value}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-stone-300 bg-white py-2 pl-9 pr-4 text-xs focus:border-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-800/20"
            />
          </div>

          <p className="mt-1 text-[11px] text-stone-500">
            Paste a publicly accessible HTTPS image URL.
          </p>
        </div>
      )}
    </div>
  );
}
