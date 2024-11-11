import dbConnect from "@/lib/mongodb";
import { addReminderToUser, getUserInfoFromToken } from "@/lib/userController";

export async function POST(req) {
  await dbConnect();

  const token = req.headers.get("Authorization")?.split(" ")[1];

  const { reminder } = await req.json();

  if (!token) {
    return new Response(JSON.stringify({ message: "No token provided" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const updatedUser = await addReminderToUser(token, reminder);
    return new Response(JSON.stringify(updatedUser), {
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
    const userInfo = await getUserInfoFromToken(token);
    return new Response(JSON.stringify(userInfo), {
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
