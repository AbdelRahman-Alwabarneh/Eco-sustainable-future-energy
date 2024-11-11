import dbConnect from "@/lib/mongodb";
import {
  createEnergyLog,
  getTotalEnergyGenerated,
} from "@/lib/energyLogController";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();

  const authHeader = req.headers.get("Authorization");
  const token = authHeader ? authHeader.split(" ")[1] : null;

  let userId;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      userId = decoded.id;
    } catch (error) {
      return new Response(JSON.stringify({ message: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    return new Response(JSON.stringify({ message: "No token provided" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const energyLogData = await req.json();
  energyLogData.userId = userId;

  try {
    const energyLog = await createEnergyLog(energyLogData, userId); // Pass userId here
    return new Response(
      JSON.stringify({ message: "Energy log created successfully", energyLog }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req) {
  await dbConnect();

  return await getTotalEnergyGenerated(req);
}
