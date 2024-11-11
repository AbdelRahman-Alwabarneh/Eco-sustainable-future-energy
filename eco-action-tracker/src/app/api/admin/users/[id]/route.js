// pages/api/admin/users/[id].js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";

const authenticateAdmin = async (req) => {
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select("role");

    return user?.role === "admin" ? user : null;
  } catch (err) {
    return null;
  }
};

export async function PUT(req, { params }) {
  const { id } = params;

  const admin = await authenticateAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    await dbConnect();

    // Update the user's active status to false
    const user = await User.findByIdAndUpdate(
      id,
      { active: false },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User blocked successfully", user });
  } catch (error) {
    console.error("Error blocking user:", error);
    return NextResponse.json(
      { error: "Failed to block user" },
      { status: 500 }
    );
  }
}
