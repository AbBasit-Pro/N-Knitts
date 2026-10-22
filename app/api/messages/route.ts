import { NextResponse } from "next/server";
import { getMessages, createMessage } from "@/lib/data-store";
import { contactSchema } from "@/lib/validations";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const items = await getMessages();
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = contactSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: validated.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const newMessage = await createMessage({
      name: validated.data.name,
      email: validated.data.email,
      phone: validated.data.phone || "",
      subject: validated.data.subject,
      message: validated.data.message,
    });

    return NextResponse.json(
      {
        success: true,
        data: newMessage,
        message: "Thank you for contacting Crafted Creations. Our master craftsmen will review your inquiry within 24 hours.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting contact message:", error);
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}
