"use client";

import Link from "next/link";
import { UserCheck, ExternalLink, Plus } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

export default function AdminHeader({ title, subtitle, actionButton }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-stone-200 px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 font-serif leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-stone-500 mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>{actionButton.label}</span>
          </button>
        )}

        <div className="flex items-center gap-2.5 pl-3 border-l border-stone-200">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
            A
          </div>
          <div className="hidden md:block">
            <span className="text-xs font-semibold text-stone-800 block leading-tight">Master Admin</span>
            <span className="text-[10px] text-stone-400">N-Knitts</span>
          </div>
        </div>
      </div>
    </header>
  );
}
