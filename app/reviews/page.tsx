import Reviews from "@/components/Reviews";
import { getReviews } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const reviews = await getReviews({ approvedOnly: true });

  return (
    <div className="py-12 sm:py-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Reviews Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
          Customer Feedback & Reviews
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 font-serif leading-tight">
          What Our Happy Customers Say
        </h1>
        <p className="text-base text-stone-600 leading-relaxed">
          Every item is hand-knit or crocheted with love, creativity, and care. Read genuine reviews from our cherished customers, families, and gift-givers.
        </p>
      </div>

      {/* Main Reviews Component with Interactive Review Submission Modal */}
      <Reviews reviews={reviews} showSubmitModal={true} />
    </div>
  );
}
