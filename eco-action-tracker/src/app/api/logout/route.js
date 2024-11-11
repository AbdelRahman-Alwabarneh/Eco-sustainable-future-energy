import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // إنشاء استجابة جديدة
    const res = NextResponse.json({ message: "You have successfully logged out" }, { status: 200 });
    
    // تفريغ الكوكي الخاصة بالتحقق من الهوية
    res.cookies.set("authToken", "", {
      path: "/", // تأكد من أن المسار يتطابق مع إعداد الكوكي عند إنشائه
      sameSite: "strict", // تأكد من أن إعداد SameSite يتطابق مع إعداد الكوكي عند إنشائه
      maxAge: 0, // تعيين العمر الافتراضي للكوكي إلى 0 يجعل الكوكي غير صالح
    });

    return res;
  } catch (err) {
    console.error("Error in logged out:", err.message);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
