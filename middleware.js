import { NextResponse } from "next/server";
import { verifyTokenEdge } from "@/app/lib/auth-edge";

export async function middleware(request) {
  console.log("🔥 MIDDLEWARE RUNNING:", request.nextUrl.pathname);

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized - No token" },
      { status: 401 },
    );
  }

  const decoded = await verifyTokenEdge(token);

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
