import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";

export async function GET() {
  await connectDB();

  return NextResponse.json({
    message: "MongoDB connected successfully",
  });
}