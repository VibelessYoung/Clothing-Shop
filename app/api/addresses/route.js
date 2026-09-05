import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import { getAuthenticatedUser } from "@/app/lib/getUser";

import Address from "@/app/model/Address";

export async function POST(request) {
  try {
    await connectDB();

    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const {
      fullName,
      phone,
      province,
      city,
      address,
      postalCode,
      plaque,
      unit,
      isDefault = false,
    } = body;

    if (!fullName || !phone || !province || !city || !address || !postalCode) {
      return NextResponse.json(
        {
          message:
            "fullName, phone, province, city, address and postalCode are required",
        },
        { status: 400 },
      );
    }

    if (isDefault) {
      await Address.updateMany(
        { user: user._id },
        { $set: { isDefault: false } },
      );
    }

    const newAddress = await Address.create({
      user: user._id,
      fullName,
      phone,
      province,
      city,
      address,
      postalCode,
      plaque,
      unit,
      isDefault,
    });

    return NextResponse.json(
      {
        message: "Address created successfully",
        address: newAddress,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create address",
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

    const addresses = await Address.find({
      user: user._id,
    }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    return NextResponse.json({
      addresses,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch addresses",
      },
      { status: 500 },
    );
  }
}
