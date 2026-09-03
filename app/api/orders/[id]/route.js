import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import { getAuthenticatedUser } from "@/app/lib/getUser";

import Order from "@/app/model/Order";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const order = await Order.findOne({
      _id: id,
      user: user._id,
    }).populate("items.product");

    if (!order) {
      return NextResponse.json(
        {
          message: "Order not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch order",
      },
      { status: 500 },
    );
  }
}
