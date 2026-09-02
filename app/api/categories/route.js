import { NextResponse } from "next/server";
import { getAdminUser } from "@/app/lib/getUser";
import { connectDB } from "@/app/lib/mongodb";
import Category from "@/app/model/Category";

export async function POST(request) {
  try {
    const { user, status } = await getAdminUser(request);

    if (!user) {
      if (status === 401) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      return NextResponse.json(
        { message: "Forbidden - Admin access required" },
        { status: 403 },
      );
    }

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
