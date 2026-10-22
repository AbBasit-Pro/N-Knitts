"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hammer, Mail, Phone, MapPin, Clock, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="N-Knitts Logo"
                className="w-10 h-10 object-contain rounded-xl bg-white p-1"
              />
              <div>
                <span className="text-xl font-bold tracking-tight text-white block leading-tight font-serif">
                  N-Knitts
                </span>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
                  Handmade Knitting & Crochet
                </span>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              We transform simple yarn into beautiful, handmade creations. From cozy knitted accessories to unique crochet pieces, every item is crafted with creativity, quality, and love.
            </p>
            <div className="pt-2">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
              >
                <span>View Full Gallery</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition">
                  Our Story & Craft
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 transition">
                  Handmade Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-amber-400 transition">
                  Collection Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-amber-400 transition">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition">
                  Custom Order Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Studio & Contact
            </h3>
            <ul className="space-y-3 text-sm text-stone-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Toronto, Ontario, Canada</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+923335484184" className="hover:text-amber-400 transition">
                  +92 333 5484184
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:ayshanuml26@gmail.com" className="hover:text-amber-400 transition">
                  ayshanuml26@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-xs text-stone-400">
                  Mon - Fri: 10am - 6pm | Sat: By Appointment
                </span>
              </li>
            </ul>
          </div>

          {/* Socials & Admin */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Follow Our Journey
            </h3>
            <p className="text-xs text-stone-400 mb-3">
              See new yarn arrivals, behind-the-scenes stitching, and newly finished handmade pieces:
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-amber-900/60 text-xs font-medium text-stone-200 transition"
              >
                Instagram
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-amber-900/60 text-xs font-medium text-stone-200 transition"
              >
                Pinterest
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-amber-900/60 text-xs font-medium text-stone-200 transition"
              >
                Facebook
              </a>
            </div>

            <div className="pt-3 border-t border-stone-800">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 text-xs text-stone-500 hover:text-amber-400 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Management Console</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} N-Knitts. All rights reserved. Handcrafted with love.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-stone-300">Our Story</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-stone-300">Custom Order Guidelines</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
