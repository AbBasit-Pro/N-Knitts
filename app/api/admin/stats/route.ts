import { NextResponse } from "next/server";
import { getDashboardStats } from "@/lib/data-store";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const stats = await getDashboardStats();
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 });
  }
}
