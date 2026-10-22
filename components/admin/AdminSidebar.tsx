"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Briefcase,
  Star,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
  Hammer,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Portfolio", href: "/admin/portfolio", icon: ImageIcon },
    { name: "Services", href: "/admin/services", icon: Briefcase },
    { name: "Reviews", href: "/admin/reviews", icon: Star },
    { name: "Messages", href: "/admin/messages", icon: Mail },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-stone-900 text-stone-300 flex flex-col justify-between shrink-0 border-r border-stone-800 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-stone-800">
          <img
            src="/logo.png"
            alt="N-Knitts Logo"
            className="w-9 h-9 object-contain rounded-lg bg-white p-1"
          />
          <div>
            <h1 className="text-sm font-bold text-white leading-tight font-serif">
              N-Knitts
            </h1>
            <span className="text-[10px] uppercase font-semibold text-amber-400 tracking-wider">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-4 space-y-1.5">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Management
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? "bg-amber-800 text-white shadow-sm"
                    : "text-stone-400 hover:text-stone-100 hover:bg-stone-800/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-200" : "text-stone-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Account section */}
      <div className="p-4 border-t border-stone-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-stone-400 hover:text-stone-100 hover:bg-stone-800/60 transition"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-amber-500" />
            <span>View Public Website</span>
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
