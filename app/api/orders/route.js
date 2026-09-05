import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import { getAuthenticatedUser } from "@/app/lib/getUser";

import Cart from "@/app/model/Cart";
import Order from "@/app/model/Order";
import Product from "@/app/model/Product";
import Address from "@/app/model/Address";

export async function POST(request) {
  try {
    await connectDB();

    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { addressId } = body;

    if (!addressId) {
      return NextResponse.json(
        {
          message: "addressId is required",
        },
        { status: 400 },
      );
    }

    const address = await Address.findOne({
      _id: addressId,
      user: user._id,
    });

    if (!address) {
      return NextResponse.json(
        {
          message: "Address not found",
        },
        { status: 404 },
      );
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

      shippingAddress: {
        fullName: address.fullName,
        phone: address.phone,
        province: address.province,
        city: address.city,
        address: address.address,
        postalCode: address.postalCode,
        plaque: address.plaque,
        unit: address.unit,
      },

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

export async function GET(request) {
  try {
    await connectDB();

    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const orders = await Order.find({
      user: user._id,
    })
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
