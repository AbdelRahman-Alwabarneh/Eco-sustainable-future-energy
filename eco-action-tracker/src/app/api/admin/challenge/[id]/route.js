import connectDB from "@/lib/mongodb"; // Adjust the path as needed
import Challenge from "@/app/models/Challenge";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = params; // Get the challenge ID from the request parameters

  try {
    // Fetch the challenge from the database by ID
    const challenge = await Challenge.findById(id);

    if (!challenge) {
      return new Response("Challenge not found", { status: 404 });
    }

    return new Response(JSON.stringify(challenge), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching challenge:", error);
    return new Response("Error fetching challenge", { status: 500 });
  }
}
