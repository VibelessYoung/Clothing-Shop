import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/model/User";
import { verifyToken } from "@/app/lib/auth";

export async function GET(request) {
  try {
    await connectDB();

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

    const user = await User.findById(decoded.userId).select(
      "_id name lastName email role",
    );

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json({
      user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to authenticate user",
      },
      {
        status: 500,
      },
    );
  }
}
