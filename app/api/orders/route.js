import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import { getAuthenticatedUser } from "@/app/lib/getUser";

import Cart from "@/app/model/Cart";
import Order from "@/app/model/Order";
import Product from "@/app/model/Product";

export async function POST(request) {
  try {
    await connectDB();

    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const cart = await Cart.findOne({
      user: user._id,
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        {
          message: "Cart is empty",
        },
        { status: 400 },
      );
    }

    const orderItems = [];

    let totalAmount = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return NextResponse.json(
          {
            message: `Product not found: ${item.product}`,
          },
          { status: 404 },
        );
      }

      if (!product.available) {
        return NextResponse.json(
          {
            message: `Product is not available: ${product.name}`,
          },
          { status: 400 },
        );
      }

      if (!product.sizes.includes(item.selectedSize)) {
        return NextResponse.json(
          {
            message: `Selected size is no longer available: ${product.name}`,
          },
          { status: 400 },
        );
      }

      if (!product.colors.includes(item.selectedColor)) {
        return NextResponse.json(
          {
            message: `Selected color is no longer available: ${product.name}`,
          },
          { status: 400 },
        );
      }

      const itemTotal = product.price * item.quantity;

      totalAmount += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      });
    }

    const order = await Order.create({
      user: user._id,
      items: orderItems,
      totalAmount,
    });

    cart.items = [];

    await cart.save();

    return NextResponse.json(
      {
        message: "Order created successfully",
        order,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create order",
      },
      { status: 500 },
    );
  }
}
