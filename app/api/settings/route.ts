import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings, getSocialLinks, updateSocialLinks } from "@/lib/data-store";
import { settingsSchema } from "@/lib/validations";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    const socialLinks = await getSocialLinks();
    return NextResponse.json({ success: true, settings, socialLinks });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { settings, socialLinks } = body;

    let updatedSettings = null;
    let updatedSocial = null;

    if (settings) {
      const validated = settingsSchema.safeParse(settings);
      if (!validated.success) {
        return NextResponse.json(
          { success: false, error: validated.error.issues[0]?.message || "Invalid settings format" },
          { status: 400 }
        );
      }
      updatedSettings = await updateSiteSettings(validated.data);
    }

    if (socialLinks && Array.isArray(socialLinks)) {
      updatedSocial = await updateSocialLinks(socialLinks);
    }

    return NextResponse.json({
      success: true,
      settings: updatedSettings || (await getSiteSettings()),
      socialLinks: updatedSocial || (await getSocialLinks()),
      message: "Settings updated successfully",
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 });
  }
}
