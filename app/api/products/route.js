import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const gender = searchParams.get("gender");

  return NextResponse.json({
    message: "gender API",
    Gender: gender,
  });
}
