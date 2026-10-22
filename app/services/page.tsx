import Link from "next/link";
import Services from "@/components/Services";
import { getServices } from "@/lib/data-store";
import { ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const allServices = await getServices({ activeOnly: true });

  const faqs = [
    {
      q: "What is the typical lead time for a custom commission?",
      a: "Depending on scope and wood acclimatization, bespoke dining tables and desks typically take 6 to 10 weeks from deposit to delivery. Complex architectural millwork is scheduled based on project timelines.",
    },
    {
      q: "Can I choose the specific hardwood slab for my table?",
      a: "Yes! For live edge and premium slab projects, we provide high-resolution photos and video tours of available kiln-dried slabs in Oregon Black Walnut, Claro Walnut, White Oak, and Maple so you can select your exact timber.",
    },
    {
      q: "Do you ship nationwide outside of Oregon?",
      a: "Yes, we custom-crate all furniture pieces using reinforced moisture-barrier packaging and ship with white-glove inside delivery across the United States and Canada.",
    },
    {
      q: "How do I maintain and care for the wood finish?",
      a: "We provide an heirloom care kit with organic beeswax conditioner with every commission. Routine care only requires a damp microfiber cloth. The hardwax-oil finish is easily spot-repairable without stripping.",
    },
  ];

  return (
    <div className="py-12 sm:py-20 space-y-20">
      {/* Services Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Services & Capabilities
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 font-serif leading-tight">
            Comprehensive Bespoke Carpentry & Architectural Woodwork
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            From single statement centerpiece furniture to turnkey estate millwork, our master woodworkers translate architectural visions into enduring realities.
          </p>
        </div>
      </section>

      {/* Main Database-driven Services Grid */}
      <Services services={allServices} showTitle={false} />

      {/* Commission Process Walkthrough */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              The Commission Journey
            </span>
            <h2 className="text-3xl font-bold text-stone-900 font-serif">
              Four Steps from Concept to Delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-900 text-white font-bold flex items-center justify-center font-serif text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-stone-900 font-serif">Discovery & Consultation</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We review your room dimensions, functional requirements, timber preferences, and aesthetic inspirations.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-900 text-white font-bold flex items-center justify-center font-serif text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-stone-900 font-serif">CAD Modeling & Timber Selection</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Receive 3D render mockups and select specific bookmatched timber billets or live-edge slabs from our inventory.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-900 text-white font-bold flex items-center justify-center font-serif text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-stone-900 font-serif">Master Joinery & Finishing</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Hand-cut mortise and tenons, hand planed surfaces, and triple coats of breathable zero-VOC botanical hardwax oil.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-900 text-white font-bold flex items-center justify-center font-serif text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-stone-900 font-serif">White-Glove Delivery</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Complete blanket-wrapped delivery, leveling, and on-site positioning in your home or corporate office.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Common Questions
          </span>
          <h2 className="text-3xl font-bold text-stone-900 font-serif">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-2">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-800 shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl p-10 sm:p-14 text-center max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif">Have a Custom Project in Mind?</h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto">
            Contact our shop team directly with your sketches, blueprints, or ideas for a detailed estimate.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition shadow-sm"
            >
              <span>Request Custom Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
