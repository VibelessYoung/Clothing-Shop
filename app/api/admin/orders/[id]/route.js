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
export async function PATCH(request, { params }) {
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

    const body = await request.json();

    const { status: newStatus, paymentStatus } = body;

    const allowedStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    const allowedPaymentStatuses = ["pending", "paid", "failed", "refunded"];

    if (newStatus !== undefined && !allowedStatuses.includes(newStatus)) {
      return NextResponse.json(
        {
          message: "Invalid order status",
        },
        { status: 400 },
      );
    }

    if (
      paymentStatus !== undefined &&
      !allowedPaymentStatuses.includes(paymentStatus)
    ) {
      return NextResponse.json(
        {
          message: "Invalid payment status",
        },
        { status: 400 },
      );
    }

    if (newStatus === undefined && paymentStatus === undefined) {
      return NextResponse.json(
        {
          message: "At least one of status or paymentStatus is required",
        },
        { status: 400 },
      );
    }

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        {
          message: "Order not found",
        },
        { status: 404 },
      );
    }

    if (newStatus !== undefined && newStatus !== order.status) {
      const allowedTransitions = {
        pending: ["processing", "cancelled"],
        processing: ["shipped", "cancelled"],
        shipped: ["delivered"],
        delivered: [],
        cancelled: [],
      };

      const allowedNextStatuses = allowedTransitions[order.status];

      if (!allowedNextStatuses.includes(newStatus)) {
        return NextResponse.json(
          {
            message: `Cannot change order status from ${order.status} to ${newStatus}`,
          },
          { status: 400 },
        );
      }
    }

    if (paymentStatus === "refunded" && order.paymentStatus !== "paid") {
      return NextResponse.json(
        {
          message: "Order must be paid before it can be refunded",
        },
        { status: 400 },
      );
    }

    if (paymentStatus === "paid" && order.paymentStatus === "refunded") {
      return NextResponse.json(
        {
          message: "A refunded payment cannot be changed back to paid",
        },
        { status: 400 },
      );
    }

    const updates = {};

    if (newStatus !== undefined) {
      updates.status = newStatus;
    }

    if (paymentStatus !== undefined) {
      updates.paymentStatus = paymentStatus;
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
      .populate("user", "_id name lastName email")
      .populate("items.product");

    return NextResponse.json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to update order",
      },
      { status: 500 },
    );
  }
}
