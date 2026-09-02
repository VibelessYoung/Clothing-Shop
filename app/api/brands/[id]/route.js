import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { getAdminUser } from "@/app/lib/getUser";
import Brand from "@/app/model/Brand";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const brand = await Brand.findById(id);

    if (!brand) {
      return NextResponse.json(
        {
          message: "Brand not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(brand);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch brand",
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

    const brand = await Brand.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!brand) {
      return NextResponse.json(
        {
          message: "Brand not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      message: "Brand updated successfully",
      brand,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to update brand",
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

    const brand = await Brand.findByIdAndDelete(id);

    if (!brand) {
      return NextResponse.json(
        {
          message: "Brand not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      message: "Brand deleted successfully",
      brand,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to delete brand",
      },
      {
        status: 500,
      },
    );
  }
}
