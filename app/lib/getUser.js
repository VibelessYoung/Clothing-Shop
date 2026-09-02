import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/model/User";
import { verifyToken } from "@/app/lib/auth";

export async function getAuthenticatedUser(request) {
  await connectDB();

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);

  if (!decoded?.userId) {
    return null;
  }

  const user = await User.findById(decoded.userId).select(
    "_id name lastName email role",
  );

  if (!user) {
    return null;
  }

  return user;
}

export async function getAdminUser(request) {
  const user = await getAuthenticatedUser(request);

  if (!user) {
    return {
      user: null,
      status: 401,
    };
  }

  if (user.role !== "admin") {
    return {
      user: null,
      status: 403,
    };
  }

  return {
    user,
    status: 200,
  };
}
