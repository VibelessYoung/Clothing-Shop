import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import { getAuthenticatedUser } from "@/app/lib/getUser";

import Cart from "@/app/model/Cart";

export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await params;

    const body = await request.json();

    const { quantity, selectedSize, selectedColor } = body;

    if (!Number.isInteger(quantity) || quantity < 1) {
      return NextResponse.json(
        {
          message: "Quantity must be a positive integer",
        },
        { status: 400 },
      );
    }

    if (!selectedSize || !selectedColor) {
      return NextResponse.json(
        {
          message: "selectedSize and selectedColor are required",
        },
        { status: 400 },
      );
    }

    const cart = await Cart.findOne({
      user: user._id,
    });

    if (!cart) {
      return NextResponse.json(
        {
          message: "Cart not found",
        },
        { status: 404 },
      );
    }

    const item = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor,
    );

    if (!item) {
      return NextResponse.json(
        {
          message: "Cart item not found",
        },
        { status: 404 },
      );
    }

    item.quantity = quantity;

    await cart.save();

    await cart.populate("items.product");

    return NextResponse.json({
      message: "Cart item updated successfully",
      cart,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to update cart item",
      },
      { status: 500 },
    );
  }
}
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await params;

    const body = await request.json();

    const { selectedSize, selectedColor } = body;

    if (!selectedSize || !selectedColor) {
      return NextResponse.json(
        {
          message: "selectedSize and selectedColor are required",
        },
        { status: 400 },
      );
    }

    const cart = await Cart.findOne({
      user: user._id,
    });

    if (!cart) {
      return NextResponse.json(
        {
          message: "Cart not found",
        },
        { status: 404 },
      );
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor,
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        {
          message: "Cart item not found",
        },
        { status: 404 },
      );
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();

    await cart.populate("items.product");

    return NextResponse.json({
      message: "Cart item removed successfully",
      cart,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to remove cart item",
      },
      { status: 500 },
    );
  }
}
