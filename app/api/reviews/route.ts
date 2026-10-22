import { NextResponse } from "next/server";
import { getReviews, createReview } from "@/lib/data-store";
import { reviewSchema } from "@/lib/validations";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const approvedOnly = searchParams.get("approved") === "true";
    const featuredOnly = searchParams.get("featured") === "true";

    const session = await getSession();
    // If not admin and not explicitly requesting all, filter by approvedOnly = true
    const requireApproved = !session || approvedOnly;

    const items = await getReviews({
      approvedOnly: requireApproved,
      featuredOnly,
    });

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = reviewSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: validated.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const session = await getSession();
    // If submitted by an admin, can auto-approve or keep form's value; if regular customer submission, queue for approval!
    const isApproved = session ? (body.isApproved ?? true) : false;

    const newReview = await createReview({
      customerName: validated.data.customerName,
      rating: validated.data.rating,
      review: validated.data.review,
      role: validated.data.role || "Verified Client",
      image: validated.data.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      isApproved,
      isFeatured: session ? (validated.data.isFeatured ?? false) : false,
    });

    return NextResponse.json({
      success: true,
      data: newReview,
      message: isApproved
        ? "Review published successfully"
        : "Thank you! Your review has been submitted and is pending administrator moderation.",
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ success: false, error: "Failed to submit review" }, { status: 500 });
  }
}
