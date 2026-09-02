import { NextResponse } from "next/server";
import { getAdminUser } from "@/app/lib/getUser";
import { connectDB } from "@/app/lib/mongodb";
import Category from "@/app/model/Category";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        {
          message: "Category not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch category",
      },
      {
        status: 500,
      },
    );
  }
}
export async function PATCH(request, { params }) {
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

    const { id } = await params;

    const body = await request.json();

    const category = await Category.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return NextResponse.json(
        {
          message: "Category not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to update category",
      },
      {
        status: 500,
      },
    );
  }
}
export async function DELETE(request, { params }) {
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

    const { id } = await params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json(
        {
          message: "Category not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to delete category",
      },
      {
        status: 500,
      },
    );
  }
}
