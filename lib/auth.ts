import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "crafted_creations_admin_session";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "crafted-creations-secure-jwt-key-2026";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export async function createSession(user: AdminUser) {
  const cookieStore = await cookies();
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const token = Buffer.from(JSON.stringify(payload)).toString("base64");

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return token;
}

export async function getSession(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const payloadStr = Buffer.from(token, "base64").toString("utf-8");
    const payload = JSON.parse(payloadStr);

    if (payload.expiresAt && payload.expiresAt < Date.now()) {
      return null;
    }

    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function requireAdminAuth(): Promise<AdminUser> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
