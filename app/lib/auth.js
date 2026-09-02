import jwt from "jsonwebtoken";

export function createToken(userId) {
  console.log("CREATE TOKEN SECRET EXISTS:", !!process.env.JWT_SECRET);

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  console.log("TOKEN CREATED");

  return token;
}

export function verifyToken(token) {
  console.log("VERIFY TOKEN SECRET EXISTS:", !!process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("JWT VERIFIED:", decoded);

    return decoded;
  } catch (error) {
    console.log("🔥 JWT VERIFY ERROR:", error.name);
    console.log("🔥 JWT VERIFY MESSAGE:", error.message);

    return null;
  }
}
