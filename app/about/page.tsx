import Link from "next/link";
import { getSiteSettings } from "@/lib/data-store";
import { Heart, Sparkles, Scissors, Smile, ArrowRight, ShieldCheck, CheckCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const settings = await getSiteSettings();

  const values = [
    {
      icon: Heart,
      title: "Handmade with Love & Care",
      description: "Every single stitch tells a story. We put our heart into every design, creating warm, cozy pieces that feel special from the first touch.",
    },
    {
      icon: Sparkles,
      title: "Premium Soft Yarns",
      description: "We carefully curate skin-friendly, hypoallergenic wools, organic cottons, and ultra-soft acrylic blends that hold shape and warmth effortlessly.",
    },
    {
      icon: Scissors,
      title: "Customized to Your Style",
      description: "From custom sizes and matching family sets to unique color combinations and patterns, we handcraft pieces tailored directly to your vision.",
    },
    {
      icon: Smile,
      title: "Bringing Joy to Every Home",
      description: "Whether it is an heirloom baby blanket or a favorite winter beanie, our goal is to deliver comfort, charm, and heartfelt happiness.",
    },
  ];

  const milestones = [
    { year: "2018", title: "The First Stitches", desc: "Started as a passion project with cozy scarves and beanies crafted for family and friends." },
    { year: "2021", title: "Baby & Gift Collections", desc: "Expanded into hypoallergenic baby booties, blankets, and custom personalized gifts loved by new parents." },
    { year: "2024", title: "Matching Sets & Custom Orders", desc: "Launched coordinated matching family sets, custom color palettes, and delicate repair services." },
    { year: "2026", title: "N-Knitts Today", desc: "Over 500 bespoke pieces lovingly hand-knit and crocheted for cherished customers worldwide." },
  ];

  return (
    <div className="py-12 sm:py-20 space-y-20">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            About N-Knitts
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 font-serif leading-tight">
            Crafted with Love, One Stitch at a Time.
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            {settings.aboutText}
          </p>
        </div>
      </section>

      {/* Visual Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-sm border border-stone-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80"
              alt="Cozy hand knitted balls of yarn and knitting needles"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-sm border border-stone-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80"
              alt="Soft textured crochet and knitted fabrics"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-sm border border-stone-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80"
              alt="Handmade knitted winter accessories and warm scarves"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-stone-50/70 py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Our Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
              Why Customers Choose N-Knitts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 font-serif">{v.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Our Journey
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 font-serif">
              From Passion to Cherished Creations
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-7 sm:before:left-1/2 before:w-0.5 before:bg-stone-200">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-amber-900 text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-md font-serif z-10">
                  {m.year}
                </div>
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex-1">
                  <h4 className="text-base font-bold text-stone-900 font-serif mb-1">{m.title}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-900 text-white rounded-3xl p-10 sm:p-14 text-center max-w-4xl mx-auto space-y-5 shadow-lg">
          <h2 className="text-3xl font-bold font-serif">Have a Dream Project in Mind?</h2>
          <p className="text-sm text-stone-200 max-w-xl mx-auto leading-relaxed">
            Whether you want custom colors, specific measurements, or a personalized gift, we’d love to handcraft it for you.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-stone-900 font-bold text-xs hover:bg-stone-100 transition shadow-sm"
            >
              <span>Get in Touch for a Custom Order</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
