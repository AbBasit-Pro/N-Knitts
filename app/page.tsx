import Link from "next/link";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Reviews from "@/components/Reviews";
import { getPortfolioItems, getServices, getReviews, getSiteSettings } from "@/lib/data-store";
import { ArrowRight, Sparkles, Heart, Scissors, CheckCircle, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredPortfolio, services, reviews, settings] = await Promise.all([
    getPortfolioItems({ featuredOnly: true, publishedOnly: true }),
    getServices({ activeOnly: true }),
    getReviews({ featuredOnly: true, approvedOnly: true }),
    getSiteSettings(),
  ]);

  return (
    <div className="space-y-20">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Business Introduction & Craftsmanship Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-stone-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                About N-Knitts
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif leading-tight">
                Where Handcrafted Passion Meets Timeless Comfort.
              </h2>
              <p className="text-base text-stone-600 leading-relaxed">
                {settings.aboutText}
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">Crafted with Pure Love & Care</h4>
                    <p className="text-xs text-stone-500">Every loop, row, and stitch is created by hand with meticulous dedication.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">Premium, Skin-Safe Yarns</h4>
                    <p className="text-xs text-stone-500">We select soft, hypoallergenic wools, cottons, and organic blends that feel wonderful against the skin.</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-900 hover:text-amber-700 transition"
                >
                  <span>Read More About Our Story & Craft</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-stone-100 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80"
                    alt="Soft handmade knitted yarn and cozy needles"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                  <div className="text-2xl font-bold font-serif text-amber-900">100%</div>
                  <div className="text-xs text-stone-600 font-medium">Handmade & Individually Crafted</div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="p-4 rounded-2xl bg-stone-900 text-white">
                  <div className="text-2xl font-bold font-serif text-amber-300">500+</div>
                  <div className="text-xs text-stone-400 font-medium">Cozy Orders Delivered with Joy</div>
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-stone-100 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80"
                    alt="Handmade crochet items and soft wool textures"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Services */}
      <Services services={services} limit={3} />

      {/* 4. Featured Portfolio Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Selected Creations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif mt-1">
              Featured Handmade Pieces
            </h2>
            <p className="text-sm text-stone-500 mt-2 max-w-xl">
              Each piece is custom-made with love, tailored colors, and thoughtful craftsmanship.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-900 text-white text-xs font-semibold hover:bg-amber-800 transition shrink-0"
          >
            <span>View Full Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <Portfolio initialItems={featuredPortfolio} showFilters={false} />
      </section>

      {/* 5. Client Testimonials */}
      <section className="bg-stone-50/70 py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Customer Love
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
              What Our Happy Customers Say
            </h2>
          </div>

          <Reviews reviews={reviews} showSubmitModal={false} />

          <div className="mt-12 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 hover:underline"
            >
              <span>Read All Verified Customer Reviews & Leave Yours</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-3xl overflow-hidden bg-amber-950 text-white p-10 sm:p-14 lg:p-20 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Commission a Custom Creation
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif leading-tight">
              Looking for something custom-made just for you?
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Tell us your favorite colors, style ideas, or measurements. We will hand-knit or crochet a one-of-a-kind piece crafted with love.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md transition"
              >
                Request Custom Order
              </Link>
              <Link
                href="/services"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition"
              >
                Browse All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
