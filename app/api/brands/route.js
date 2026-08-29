import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";

import Brand from "@/app/model/Brand";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const brand = await Brand.create(body);

    return NextResponse.json(
      {
        message: "Brand created successfully",
        brand,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create brand",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const brands = await Brand.find();

    return NextResponse.json(brands);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch brands",
      },
      {
        status: 500,
      },
    );
  }
}
