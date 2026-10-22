"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Award, Trees } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/50 via-stone-50 to-white pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>N-Knitts — Handmade Knitting & Crochet</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-4xl font-extrabold text-stone-900 tracking-tight font-serif leading-[1.15]">
              Crafted with Love, One Stitch at a Time.
            </h1>

            <p className="text-lg text-stone-600 leading-relaxed max-w-2xl">
At N-Knitts, we transform simple yarn into beautiful, handmade creations. From cozy knitted accessories to unique crochet pieces, every creation is carefully crafted with creativity, quality, and love. Our mission is to bring warmth, comfort, and joy to every customer through timeless handmade craftsmanship.            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-900 text-white font-semibold text-sm hover:bg-amber-800 shadow-md hover:shadow-lg transition-all"
              >
                <span>Explore Our Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-stone-800 font-semibold text-sm hover:bg-stone-50 border border-stone-300 shadow-sm transition"
              >
                <span>Request Custom Commission</span>
              </Link>
            </div>

            {/* Credibility highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-stone-200">
              <div className="flex items-start gap-3">
                <Trees className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900 text-sm">Handmade with Love

</div>
                  <div className="text-xs text-stone-500">Every piece crafted with care</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900 text-sm">Unique Designs

</div>
                  <div className="text-xs text-stone-500">Creative knitting and crochet</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900 text-sm">Quality Craftsmanship

</div>
                  <div className="text-xs text-stone-500">Beautiful stitches, lasting quality</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Feature */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 aspect-[4/5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
          
                  <img src="/product.jpg"   
                  alt="Artisan woodcraft dining table with walnut finish"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
Featured Creation


Soft Yarn • Beautiful Stitches • Made with Love                  </span>
                  <h3 className="text-lg font-bold font-serif">Cozy Handcrafted Crochet Collection
</h3>
                  <p className="text-xs text-stone-200 mt-1">Cozy Handcrafted Crochet Collection
</p>
                </div>
              </div>

              {/* Floating Floating Accent Card */}
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-stone-200 max-w-xs hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-lg font-serif">
                    100+
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-900">

Handmade Creations



                    </div>
                    <div className="text-xs text-stone-500">Beautiful knitting and crochet pieces crafted with care, creativity, and love.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
