import { NextResponse } from "next/server";

import { getAdminUser } from "@/app/lib/getUser";
import Order from "@/app/model/Order";

export async function GET(request) {
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

    const orders = await Order.find({})
      .populate("user", "_id name lastName email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      orders,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch orders",
      },
      { status: 500 },
    );
  }
}
