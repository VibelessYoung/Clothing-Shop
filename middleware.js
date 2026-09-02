import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";

export function middleware(request) {
  console.log("🔥 MIDDLEWARE RUNNING:", request.nextUrl.pathname);

  const token = request.cookies.get("token")?.value;

  console.log("🍪 TOKEN:", token);

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized - No token" },
      { status: 401 },
    );
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json(
      { message: "Unauthorized - Invalid token" },
      { status: 401 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
