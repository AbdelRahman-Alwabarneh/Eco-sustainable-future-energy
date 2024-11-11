// app/api/admin/profile/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";

const authenticateToken = (req) => {
  const authToken = req.cookies.get("authToken"); // Make sure you're getting it from cookies
  console.log("Received Token:", authToken); // Log the token for debugging

  if (!authToken) {
    return null;
  }

  try {
    return jwt.verify(authToken, process.env.JWT_SECRET_KEY);
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
};

export async function GET(req) {
  await dbConnect();

  const user = authenticateToken(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const userData = await User.findById(user.id).select("-password");
    if (!userData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  await dbConnect();

  const user = authenticateToken(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { firstName, lastName } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      { firstName, lastName },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
