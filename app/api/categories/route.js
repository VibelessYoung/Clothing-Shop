import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Category from "@/app/model/Category";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const category = await Category.create(body);

    return NextResponse.json(
      {
        message: "Category created successfully",
        category,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create category",
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

    const categories = await Category.find();

    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch categories",
      },
      {
        status: 500,
      },
    );
  }
}
