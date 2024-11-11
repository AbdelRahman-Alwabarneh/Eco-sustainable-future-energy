// app/api/users/route.js
import dbConnect from "@/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

export async function POST(req) {
  await dbConnect();

  const { firstName, lastName, email, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "Email is already registered." },
      { status: 400 }
    );
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const payloadJwt = {
      id: newUser.id,
    };

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payloadJwt, secretKey, { expiresIn: "2h" });

    const response = NextResponse.json(newUser, { status: 201 });

    response.cookies.set("authToken", token, {
      httpOnly: false,
      sameSite: "strict",
      maxAge: 2 * 60 * 60, // 2 hours in seconds
    });

    console.log(token);
    return response;
  } catch (error) {
    console.error("Error while creating user:", error); // إضافة هذا السطر
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
