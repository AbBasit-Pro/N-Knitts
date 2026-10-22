"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Briefcase,
  Star,
  Mail,
  MessageSquare,
} from "lucide-react";

type IconName = "ImageIcon" | "Briefcase" | "Star" | "Mail" | "LayoutDashboard" | "MessageSquare";

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: IconName;
  badge?: string;
  href?: string;
}

const iconMap: Record<IconName, React.ReactNode> = {
  ImageIcon: <ImageIcon className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
};

export default function StatCard({ title, value, subtitle, icon, badge, href }: StatCardProps) {
  const content = (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md hover:border-amber-200 transition">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">{title}</span>
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
          {iconMap[icon]}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-stone-900 font-serif">{value}</span>
        {badge && (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
            {badge}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-stone-500 mt-2">{subtitle}</p>}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
