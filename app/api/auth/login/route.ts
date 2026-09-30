import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionToken, verifyCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim();
    const password = body.password?.trim();

    if (!email || !password) {
      return NextResponse.json({ ok: false, message: "Email and password are required." }, { status: 400 });
    }

    const user = await verifyCredentials(email, password);

    if (!user) {
      return NextResponse.json({ ok: false, message: "Invalid email or password." }, { status: 401 });
    }

    const token = createSessionToken(user);
    const cookieStore = await cookies();

    cookieStore.set("exam_coach_session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ ok: false, message: "Unable to log in right now." }, { status: 500 });
  }
}
