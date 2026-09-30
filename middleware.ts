import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = [
  "/dashboard",
  "/subjects",
  "/papers",
  "/practice",
  "/exam",
  "/results",
  "/progress",
  "/ai-coach",
  "/profile",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("exam_coach_session")?.value;
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedPaths.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/subjects/:path*",
    "/papers/:path*",
    "/practice/:path*",
    "/exam/:path*",
    "/results/:path*",
    "/progress/:path*",
    "/ai-coach/:path*",
    "/profile/:path*",
  ],
};
