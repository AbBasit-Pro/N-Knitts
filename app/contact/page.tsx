import ContactForm from "@/components/ContactForm";
import { getSiteSettings } from "@/lib/data-store";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; subject?: string }>;
}) {
  const settings = await getSiteSettings();
  const params = await searchParams;

  const defaultSubject = params.service
    ? `Inquiry regarding ${params.service}`
    : params.subject || "";

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 font-serif leading-tight">
          Request a Custom Creation
        </h1>
        <p className="text-base text-stone-600 leading-relaxed">
          Whether you need a custom-fitted sweater, personalized gift, matching family beanies, or a special crochet design, we are excited to handcraft it for you.
        </p>
      </div>

      {/* Main Grid: Details + Validated Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Workshop Contact Info & Guarantees */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-stone-900 font-serif">
              Studio & Contact Information
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">Studio Location</span>
                  <span className="text-stone-600">{settings.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">Telephone</span>
                  <a href={`tel:${settings.phone}`} className="text-stone-600 hover:text-amber-900 transition">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">Direct Email</span>
                  <a href={`mailto:${settings.email}`} className="text-stone-600 hover:text-amber-900 transition">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">Hours of Operation</span>
                  <span className="text-stone-600">{settings.operatingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Promise */}
          <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>What to Expect Next</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-600 leading-relaxed">
              <li>• Direct personal response within 24 hours to review your ideas.</li>
              <li>• Friendly advice on yarn selection, color palettes, and sizing.</li>
              <li>• Clear upfront quote and target delivery timeframe.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm defaultSubject={defaultSubject} />
        </div>
      </div>
    </div>
  );
}
