import { NextResponse } from "next/server";

import { verifyToken } from "@/app/lib/auth";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json(
      {
        message: "Invalid or expired token",
      },
      {
        status: 401,
      },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
