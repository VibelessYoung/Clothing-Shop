import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/model/User";

import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get request body
    const body = await request.json();

    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required",
        },
        {
          status: 400,
        },
      );
    }

    // Find user
    const user = await User.findOne({
      email,
    });

    // User not found
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

    // Compare password with hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // Wrong password
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

    // Remove password from response
    const userResponse = user.toObject();

    delete userResponse.password;

    // Login successful
    return NextResponse.json(
      {
        message: "Login successful",
        user: userResponse,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to login",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
