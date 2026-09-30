import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createDemoUser, createSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { name?: string; email?: string; password?: string };
    const name = body.name?.trim();
    const email = body.email?.trim();
    const password = body.password?.trim();

    if (!name || !email || !password) {
      return NextResponse.json({ ok: false, message: "Name, email, and password are required." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ ok: false, message: "Password must be at least 6 characters long." }, { status: 400 });
    }

    const user = createDemoUser(name, email, password);
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
    console.error("Signup error:", error);
    return NextResponse.json({ ok: false, message: "Unable to create the account right now." }, { status: 500 });
  }
}
