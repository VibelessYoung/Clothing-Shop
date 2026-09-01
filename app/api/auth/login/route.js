import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/model/User";
import { createToken } from "@/app/lib/auth";

import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { email, password } = body;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 401,
        },
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 401,
        },
      );
    }

    const token = createToken(user._id.toString());

    const response = NextResponse.json({
      message: "Login successful",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Login failed",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
