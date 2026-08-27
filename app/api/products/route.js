import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Product from "@/app/model/Product";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const product = await Product.create(body);

    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create product",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
