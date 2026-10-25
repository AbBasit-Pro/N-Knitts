
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_FILE_SIZE = 4 * 1024 * 1024;

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
]);

export async function POST(req: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized. Please log in first.",
        },
        { status: 401 }
      );
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("Cloudinary environment variables are missing.");

      return NextResponse.json(
        {
          success: false,
          error: "Cloud image storage is not configured.",
        },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "No image file was received.",
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported image format.",
        },
        { status: 400 }
      );
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: "Image must be between 1 byte and 4 MB.",
        },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${bytes.toString("base64")}`,
      {
        folder: "portfolio",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp", "avif", "gif"],
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully.",
        url: result.secure_url,
        publicId: result.public_id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Portfolio image upload failed:", error);

    const message =
      error instanceof Error ? error.message : "Unknown upload error";

    // Do not return secrets or raw provider errors to the browser.
    return NextResponse.json(
      {
        success: false,
        error: "Image upload failed. Check the server logs and configuration.",
      },
      { status: 500 }
    );
  }
}
