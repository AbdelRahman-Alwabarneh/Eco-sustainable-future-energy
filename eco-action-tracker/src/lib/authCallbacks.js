import User from "@/app/models/User";
import connectToDatabase from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // استيراد cookies

export const authCallbacks = {
  async signIn({ user, account }) {
    await connectToDatabase();

    let dbUser = await User.findOne({ email: user.email });

    if (!dbUser) {
      dbUser = new User({
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ").slice(1).join(" "),
        email: user.email,
        picture: user.image,
        googleId: account.providerAccountId,
      });
      await dbUser.save();
    }

    const payloadJwt = {
      id: dbUser._id.toString(),
    };

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payloadJwt, secretKey, { expiresIn: "2h" });

    // استخدام cookies لتخزين الكوكي بشكل صحيح
    const cookieStore = cookies();
    cookieStore.set("authToken", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 2 * 60 * 60, // ساعتين
      path: "/", // يضمن أن الكوكي متاح في كل صفحات الموقع
    });

    // استجابة بنجاح تسجيل الدخول
    return NextResponse.json(
      { success: true, message: "Authentication successful" },
      { status: 200 }
    );
  },
};
