"use client";

import Link from "next/link";
import { ServiceItem } from "@/lib/data-store";
import {
  Check,
  ArrowRight,
  Shirt,
  Gift,
  Baby,
  Users,
  Palette,
  Scissors,
  Package,
  Sparkles,
  Layers
} from "lucide-react";

interface ServicesProps {
  services: ServiceItem[];
  limit?: number;
  showTitle?: boolean;
}

export default function Services({ services, limit, showTitle = true }: ServicesProps) {
  const displayServices = limit ? services.slice(0, limit) : services;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Shirt":
        return <Shirt className="w-6 h-6 text-amber-800" />;
      case "Gift":
        return <Gift className="w-6 h-6 text-amber-800" />;
      case "Baby":
        return <Baby className="w-6 h-6 text-amber-800" />;
      case "Users":
        return <Users className="w-6 h-6 text-amber-800" />;
      case "Palette":
        return <Palette className="w-6 h-6 text-amber-800" />;
      case "Scissors":
        return <Scissors className="w-6 h-6 text-amber-800" />;
      case "Package":
        return <Package className="w-6 h-6 text-amber-800" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-800" />;
    }
  };

  return (
    <section className="py-20 bg-stone-50/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Handcrafted Services & Collections
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
              Made with Care, Tailored to You
            </h2>
            <p className="text-base text-stone-600">
              From bespoke wardrobe favorites and heirloom baby gifts to custom color designs and meticulous repairs.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center group-hover:bg-amber-100 transition">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-stone-700">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-stone-900 mb-2 font-serif group-hover:text-amber-900 transition">
                  {service.title}
                </h3>

                <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="mb-6 pt-4 border-t border-stone-100">
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
                    What&apos;s Included
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 block">Investment</span>
                  <span className="text-sm font-bold text-stone-900 font-serif">
                    {service.price}
                  </span>
                </div>
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-700 transition"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {limit && (
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 font-semibold text-sm hover:bg-stone-50 shadow-sm transition"
            >
              <span>Explore All Services & Pricing Estimates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
