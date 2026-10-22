"use client";

import { useState } from "react";
import Link from "next/link";
import { PortfolioItem } from "@/lib/data-store";
import { Search, ArrowRight, Eye, Calendar, Sparkles } from "lucide-react";

interface PortfolioProps {
  initialItems: PortfolioItem[];
  categories?: string[];
  limit?: number;
  showFilters?: boolean;
}

export default function Portfolio({
  initialItems,
  categories = ["All", "Handmade Clothing", "Baby & Kids", "Family Sets", "Home Decor", "Gifts & Accessories"],
  limit,
  showFilters = true,
}: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = initialItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchTerm.trim() === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.materials && item.materials.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  return (
    <div className="space-y-8">
      {showFilters && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-stone-200">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 items-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-amber-900 text-white shadow-sm"
                    : "bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search wood, style, client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
            />
          </div>
        </div>
      )}

      {displayItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
          <p className="text-stone-500 text-sm">No portfolio items matched your filter or search criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchTerm("");
            }}
            className="text-xs font-semibold text-amber-900 hover:underline"
          >
            Clear filters and reset search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Hover zoom */}
                <div className="relative aspect-[16/11] overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-stone-900/80 backdrop-blur-sm text-white">
                      {item.category}
                    </span>
                    {item.featured && (
                      <span className="px-2 py-1 rounded-md text-[11px] font-semibold bg-amber-600/90 text-white flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-stone-900 font-serif mb-2 group-hover:text-amber-900 transition line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {item.materials && (
                    <div className="text-[11px] text-stone-500 mb-2">
                      <span className="font-semibold text-stone-700">Materials: </span>
                      {item.materials}
                    </div>
                  )}

                  {item.completionDate && (
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                      <Calendar className="w-3 h-3" />
                      <span>{item.completionDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action link */}
              <div className="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between">
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-700 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Case Study</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                {item.client && (
                  <span className="text-[11px] text-stone-400 truncate max-w-[140px]">
                    {item.client}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
