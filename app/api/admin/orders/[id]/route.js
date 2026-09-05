import { NextResponse } from "next/server";

import mongoose from "mongoose";

import { getAdminUser } from "@/app/lib/getUser";

import Order from "@/app/model/Order";

export async function GET(request, { params }) {
  try {
    const { user, status } = await getAdminUser(request);

    if (!user) {
      return NextResponse.json(
        {
          message: status === 401 ? "Unauthorized" : "Forbidden",
        },
        { status },
      );
    }

    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        {
          message: "Invalid order ID",
        },
        { status: 400 },
      );
    }

    const order = await Order.findById(id)
      .populate("user", "_id name lastName email")
      .populate("items.product");

    if (!order) {
      return NextResponse.json(
        {
          message: "Order not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      order,
    });
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
