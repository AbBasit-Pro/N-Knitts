"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Hammer, ShieldCheck, PhoneCall } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // If in admin route, don't show public navbar
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
<div className="flex items-center gap-3">
  <img
    src="/logo.png"
    alt="N-Knitts Logo"
    className="w-10 h-10 object-contain"
  />

  <span className="text-xl font-bold font-serif text-stone-900 tracking-tight">
   N-Knitts
  </span>
</div>             
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "text-amber-900 bg-amber-50 font-semibold"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-900 hover:bg-amber-800 rounded-lg shadow-sm transition"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Get a Quote</span>
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-600 hover:text-amber-900 hover:bg-amber-50/50 rounded-lg border border-stone-200 transition"
              title="Admin Management Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/admin/login"
              className="p-2 text-stone-600 hover:text-amber-900 rounded-lg"
              title="Admin"
            >
              <ShieldCheck className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive
                    ? "bg-amber-50 text-amber-900 font-semibold"
                    : "text-stone-700 hover:bg-stone-50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-amber-900 rounded-lg shadow-sm"
            >
              Request Custom Project
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2 text-xs font-medium text-stone-600 border border-stone-200 rounded-lg"
            >
              Admin Management Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
