import dbConnect from "@/lib/mongodb";
import Contacts from "@/app/models/Contacts"; // تأكد من أن مسار النموذج صحيح
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { Name, Email, Message } = await req.json(); // استخدام await لقراءة محتوى الطلب

    if (!Name || !Email || !Message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // الاتصال بقاعدة البيانات
    await dbConnect();

    // استخدام Model.create() لإدراج المستخدم الجديد
    const contact = await Contacts.create({
      name: Name,
      email: Email,
      message: Message,
    });

    return NextResponse.json(
      { message: "Contact created successfully", user: contact },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
