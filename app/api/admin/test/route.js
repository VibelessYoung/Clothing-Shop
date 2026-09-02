import { NextResponse } from "next/server";
import { getAdminUser } from "@/app/lib/getUser";

export async function GET(request) {
  try {
    const { user, status } = await getAdminUser(request);

    if (!user) {
      if (status === 401) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      if (status === 403) {
        return NextResponse.json(
          { message: "Forbidden - Admin access required" },
          { status: 403 },
        );
      }
    }

    return NextResponse.json({
      message: "You can access admin route",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
