import Portfolio from "@/components/Portfolio";
import { getPortfolioItems } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const allPortfolioItems = await getPortfolioItems({ publishedOnly: true });

  const categories = [
    "All",
    "Handmade Clothing",
    "Baby & Kids",
     "Home Decor",
    "Gifts & Accessories",
  ];

  return (
    <div className="py-12 sm:py-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Portfolio Gallery Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
          Our Collection & Archive
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 font-serif leading-tight">
          Handmade Knitting & Crochet Creations
        </h1>
        <p className="text-base text-stone-600 leading-relaxed">
          Browse our completed handmade clothing, cozy baby booties, family sets, and personalized gifts. Filter by collection or search by material and color.
        </p>
      </div>

      {/* Main Interactive Portfolio Gallery with Filter and Search */}
      <Portfolio
        initialItems={allPortfolioItems}
        categories={categories}
        showFilters={true}
      />
    </div>
  );
}
