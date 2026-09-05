import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import { getAuthenticatedUser } from "@/app/lib/getUser";

import Address from "@/app/model/Address";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const address = await Address.findOne({
      _id: id,
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

    return NextResponse.json(address);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch address",
      },
      { status: 500 },
    );
  }
}
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

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
      isDefault,
    } = body;

    const existingAddress = await Address.findOne({
      _id: id,
      user: user._id,
    });

    if (!existingAddress) {
      return NextResponse.json(
        { message: "Address not found" },
        { status: 404 },
      );
    }

    if (isDefault === true) {
      await Address.updateMany(
        {
          user: user._id,
          _id: { $ne: id },
        },
        {
          $set: { isDefault: false },
        },
      );
    }

    if (fullName !== undefined) existingAddress.fullName = fullName;
    if (phone !== undefined) existingAddress.phone = phone;
    if (province !== undefined) existingAddress.province = province;
    if (city !== undefined) existingAddress.city = city;
    if (address !== undefined) existingAddress.address = address;
    if (postalCode !== undefined) existingAddress.postalCode = postalCode;
    if (plaque !== undefined) existingAddress.plaque = plaque;
    if (unit !== undefined) existingAddress.unit = unit;
    if (isDefault !== undefined) existingAddress.isDefault = isDefault;

    await existingAddress.save();

    return NextResponse.json({
      message: "Address updated successfully",
      address: existingAddress,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to update address",
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

    const { id } = await params;

    const address = await Address.findOne({
      _id: id,
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

    await Address.deleteOne({
      _id: id,
      user: user._id,
    });

    return NextResponse.json({
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to delete address",
      },
      { status: 500 },
    );
  }
}
