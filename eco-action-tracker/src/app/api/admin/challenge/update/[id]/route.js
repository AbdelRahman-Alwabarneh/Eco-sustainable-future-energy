import connectDB from "@/lib/mongodb"; 
import Challenge from "@/app/models/Challenge";
export async function PUT(req, { params }) {
  await connectDB();
  const { id } = params;
  const { title, thumbnail, startDate, endDate, progress } = await req.json();

  try {
    const updatedChallenge = await Challenge.findByIdAndUpdate(
      id,
      {
        title,
        thumbnail,
        startDate,
        endDate,
        progress,
      },
      { new: true }
    );

    if (!updatedChallenge) {
      return new Response("Challenge not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedChallenge), { status: 200 });
  } catch (error) {
    return new Response("Error updating challenge", { status: 500 });
  }
}
