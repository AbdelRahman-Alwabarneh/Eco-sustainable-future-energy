import dbConnect from "@/lib/mongodb";
import Challenge from "@/app/models/Challenge";

export async function GET(req) {
  await dbConnect();
  try {
    const challenges = await Challenge.find({ delete: false }); 
    return new Response(JSON.stringify({ challenges }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch challenges." }),
      {
        status: 500,
      }
    );
  }
}
