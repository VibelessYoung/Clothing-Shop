import { NextResponse } from "next/server";
import { getAdminUser } from "@/app/lib/getUser";
import { connectDB } from "@/app/lib/mongodb";
import Brand from "@/app/model/Brand";

export async function POST(request) {
  try {
    await connectDB();
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
