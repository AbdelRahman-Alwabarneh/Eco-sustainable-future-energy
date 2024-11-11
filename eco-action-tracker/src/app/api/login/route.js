// app/api/users/login/route.js
import dbConnect from "@/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

export async function POST(req) {
  await dbConnect();

  const { email, password } = await req.json();

  // التحقق إذا كان المستخدم موجود في قاعدة البيانات
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // التحقق من صحة كلمة المرور
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  // إنشاء رمز JWT
  const payloadJwt = {
    id: user.id,
  };

  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(payloadJwt, secretKey, { expiresIn: "2h" });

  // إعداد الرد مع رمز التوثيق في الكوكيز
  const response = NextResponse.json(
    {
      message: "Login successful",
      role: user.role,
      userId: user.id,
    },
    { status: 200 }
  );

  response.cookies.set("authToken", token, {
    httpOnly: false,
    sameSite: "strict",
    maxAge: 2 * 60 * 60, // 2 ساعات
  });

  console.log(token);
  return response;
}
