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
