import { notFound } from "next/navigation";
import Link from "next/link";
import { getPortfolioItemBySlug, getPortfolioItems } from "@/lib/data-store";
import { ArrowLeft, ArrowRight, Calendar, User, Ruler, Layers, Sparkles, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);

  if (!item) {
    notFound();
  }

  // Fetch 2-3 related items
  const allItems = await getPortfolioItems({ publishedOnly: true });
  const relatedItems = allItems.filter((p) => p.id !== item.id && p.category === item.category).slice(0, 3);

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <div>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-amber-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio Gallery</span>
        </Link>
      </div>

      {/* Main Case Study Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Image Gallery View */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-lg aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            {item.featured && (
              <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Commission</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Project Specifications & Story */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              {item.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif mt-2 leading-tight">
              {item.title}
            </h1>
          </div>

          <div className="prose prose-stone text-sm text-stone-600 leading-relaxed">
            <p>{item.description}</p>
          </div>

          {/* Project Details Sheet */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Project Specifications
            </h3>

            <div className="space-y-3 text-xs">
              {item.materials && (
                <div className="flex items-start gap-2.5">
                  <Layers className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900 block">Yarns & Materials</span>
                    <span className="text-stone-600">{item.materials}</span>
                  </div>
                </div>
              )}

              {item.dimensions && (
                <div className="flex items-start gap-2.5">
                  <Ruler className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900 block">Sizes & Dimensions</span>
                    <span className="text-stone-600">{item.dimensions}</span>
                  </div>
                </div>
              )}

              {item.client && (
                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900 block">Customer / Edition</span>
                    <span className="text-stone-600">{item.client}</span>
                  </div>
                </div>
              )}

              {item.completionDate && (
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900 block">Crafted Date</span>
                    <span className="text-stone-600">{item.completionDate}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Inquiry Box */}
          <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
            <h4 className="text-sm font-bold text-stone-900 font-serif">
              Love this handmade piece?
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every creation can be tailored in your favorite yarn colors, custom sizing, and stitch motifs.
            </p>
            <Link
              href={`/contact?subject=${encodeURIComponent(`Custom Order Inquiry: ${item.title}`)}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold shadow-sm transition"
            >
              <span>Request Similar Custom Piece</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {relatedItems.length > 0 && (
        <div className="pt-16 border-t border-stone-200 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              More in {item.category}
            </span>
            <h3 className="text-2xl font-bold text-stone-900 font-serif mt-1">
              Related Creations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedItems.map((rel) => (
              <Link
                key={rel.id}
                href={`/portfolio/${rel.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition"
              >
                <div className="aspect-[16/11] overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rel.imageUrl}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h4 className="text-base font-bold text-stone-900 font-serif group-hover:text-amber-900 transition truncate">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-1">{rel.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
