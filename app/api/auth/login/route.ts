import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { verifyAdminCredentials } from "@/lib/data-store";
import { loginSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: validated.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const { username, password } = validated.data;
    const user = await verifyAdminCredentials(username, password);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid username/email or password" },
        { status: 401 }
      );
    }

    await createSession(user);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
