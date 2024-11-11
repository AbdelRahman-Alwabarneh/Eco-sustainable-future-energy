// app/api/admin/challenges/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Challenge from "@/app/models/Challenge";
import jwt from "jsonwebtoken";

const authenticateAdmin = async (req) => {
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Here you would typically check the user role
    return decoded;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
};

export async function POST(req) {
  await dbConnect();

  // Authenticate admin
  const admin = await authenticateAdmin(req);
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const challenge = new Challenge(body);
    await challenge.save();

    return NextResponse.json(
      { message: "Challenge created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating challenge:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

