
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

    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("Error fetching services:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch services",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // 1. Check authentication
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // 2. Read request body
    const body = await req.json();

    // 3. Normalize features into a string array
    const rawFeatures = body.features;

    const featuresList: string[] = Array.isArray(rawFeatures)
      ? rawFeatures
          .filter((f): f is string => typeof f === "string")
          .map((f) => f.trim())
          .filter(Boolean)
      : typeof rawFeatures === "string"
        ? rawFeatures
            .split(/\r?\n/)
            .map((f) => f.trim())
            .filter(Boolean)
        : [];

    // 4. Convert features to string for existing schema
    const normalizedBody = {
      ...body,
      features: featuresList.join("\n"),
    };

    // 5. Validate normalized data
    const validated = serviceSchema.safeParse(normalizedBody);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            validated.error.issues
              .map((issue) =>
                `${issue.path.join(".") || "input"}: ${issue.message}`
              )
              .join(", ") || "Validation error",
        },
        { status: 400 }
      );
    }

    // 6. Create service
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

    // 7. Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully",
        data: newService,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating service:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create service",
      },
      { status: 500 }
    );
  }
}
