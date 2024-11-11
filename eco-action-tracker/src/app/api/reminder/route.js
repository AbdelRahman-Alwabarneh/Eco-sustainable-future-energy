import dbConnect from "@/lib/mongodb";
import { getUserReminders } from "@/lib/userController";

export async function GET(req) {
  await dbConnect();

  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return new Response(JSON.stringify({ message: "No token provided" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const reminders = await getUserReminders(token);
    return new Response(JSON.stringify(reminders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
