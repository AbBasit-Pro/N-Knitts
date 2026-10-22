import { NextResponse } from "next/server";
import { getServices, createService } from "@/lib/data-store";
import { serviceSchema } from "@/lib/validations";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const activeOnly = searchParams.get("active") === "true";

    const items = await getServices({ category, activeOnly });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validated = serviceSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: validated.error.issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    const rawFeatures = body.features;
    const featuresList = Array.isArray(rawFeatures)
      ? rawFeatures
      : typeof rawFeatures === "string"
      ? rawFeatures.split("\n").map((f: string) => f.trim()).filter(Boolean)
      : [];

    const newService = await createService({
      title: validated.data.title,
      slug: validated.data.slug,
      description: validated.data.description,
      price: validated.data.price,
      icon: validated.data.icon,
      category: validated.data.category,
      features: featuresList,
      isActive: validated.data.isActive ?? true,
    });

    return NextResponse.json({ success: true, data: newService }, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ success: false, error: "Failed to create service" }, { status: 500 });
  }
}
