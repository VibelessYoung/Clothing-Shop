import { jwtVerify } from "jose";

export async function verifyTokenEdge(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    return payload;
  } catch (error) {
    console.error("JWT EDGE VERIFY ERROR:", error.message);

    return null;
  }
}
