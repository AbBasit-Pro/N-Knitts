import { NextResponse } from "next/server";
import { getPortfolioItems, createPortfolioItem } from "@/lib/data-store";
import { portfolioSchema } from "@/lib/validations";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const featuredOnly = searchParams.get("featured") === "true";
    const publishedOnly = searchParams.get("published") === "true";

    const items = await getPortfolioItems({
      category,
      search,
      featuredOnly,
      publishedOnly,
    });

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch portfolio" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validated = portfolioSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: validated.error.issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    const newItem = await createPortfolioItem(validated.data);
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    return NextResponse.json({ success: false, error: "Failed to create portfolio item" }, { status: 500 });
  }
}
