import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import { getAuthenticatedUser } from "@/app/lib/getUser";

import Cart from "@/app/model/Cart";
import Product from "@/app/model/Product";

export async function POST(request) {
  try {
    await connectDB();

    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { productId, quantity = 1, selectedSize, selectedColor } = body;

    if (!productId || !selectedSize || !selectedColor) {
      return NextResponse.json(
        {
          message: "productId, selectedSize and selectedColor are required",
        },
        { status: 400 },
      );
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return NextResponse.json(
        {
          message: "Quantity must be a positive integer",
        },
        { status: 400 },
      );
    }

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    if (!product.available) {
      return NextResponse.json(
        {
          message: "Product is not available",
        },
        { status: 400 },
      );
    }

    if (product.stock <= 0) {
      return NextResponse.json(
        {
          message: "Product is out of stock",
        },
        { status: 400 },
      );
    }

    if (quantity > product.stock) {
      return NextResponse.json(
        {
          message: `Only ${product.stock} item(s) are available`,
        },
        { status: 400 },
      );
    }

    if (!product.sizes.includes(selectedSize)) {
      return NextResponse.json(
        {
          message: "Selected size is not available",
        },
        { status: 400 },
      );
    }

    if (!product.colors.includes(selectedColor)) {
      return NextResponse.json(
        {
          message: "Selected color is not available",
        },
        { status: 400 },
      );
    }

    let cart = await Cart.findOne({ user: user._id });

    if (!cart) {
      cart = await Cart.create({
        user: user._id,
        items: [
          {
            product: product._id,
            quantity,
            selectedSize,
            selectedColor,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find(
        (item) =>
          item.product.toString() === productId &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor,
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity > product.stock) {
          return NextResponse.json(
            {
              message: `Only ${product.stock} item(s) are available`,
            },
            { status: 400 },
          );
        }

        existingItem.quantity = newQuantity;
      } else {
        cart.items.push({
          product: product._id,
          quantity,
          selectedSize,
          selectedColor,
        });
      }

      await cart.save();
    }

    await cart.populate("items.product");

    return NextResponse.json(
      {
        message: "Product added to cart successfully",
        cart,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to add product to cart",
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

    const cart = await Cart.findOne({
      user: user._id,
    }).populate("items.product");

    if (!cart) {
      return NextResponse.json({
        user: user._id,
        items: [],
      });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch cart",
      },
      { status: 500 },
    );
  }
}
export async function DELETE(request) {
  try {
    await connectDB();

    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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

    cart.items = [];

    await cart.save();

    return NextResponse.json({
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to clear cart",
      },
      { status: 500 },
    );
  }
}
