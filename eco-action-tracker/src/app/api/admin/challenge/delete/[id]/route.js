// src/app/api/admin/challenge/delete/[id]/route.js
import connectDB from "@/lib/mongodb"; // Ensure this path is correct
import Challenge from "@/app/models/Challenge";
export async function PUT(req, { params }) {
  await connectDB(); // Ensure you are connecting to the database

  const { id } = params;

  try {
    // Update the challenge to mark it as deleted
    const challenge = await Challenge.findByIdAndUpdate(
      id,
      { delete: true }, // Ensure you're updating the correct field
      { new: true } // Return the updated document
    );

    // Check if the challenge exists
    if (!challenge) {
      return new Response(JSON.stringify({ message: "Challenge not found" }), {
        status: 404,
      });
    }

    // Return a success response
    return new Response(
      JSON.stringify({ message: "Challenge deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error deleting challenge:", error);

    // Return an error response with details
    return new Response(
      JSON.stringify({
        message: "Failed to delete challenge",
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
