import dbConnect from "@/lib/mongodb";
import {
  createChallenge,
  getAllChallenges,
  getChallengeById,
  getUserJoiningChallenges,
  getUserCompletedChallenges,
} from "@/lib/challengeController";

export async function POST(req) {
  await dbConnect();
  const challengeData = await req.json();

  try {
    const challenge = await createChallenge(challengeData);
    return new Response(
      JSON.stringify({ message: "Challenge created successfully", challenge }),
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
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type");

  const authToken = req.headers.get("Authorization")?.split(" ")[1];

  try {
    if (authToken) {
      if (type === "completed") {
        const completedChallenges = await getUserCompletedChallenges(authToken);
        return new Response(JSON.stringify(completedChallenges), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        const joiningChallenges = await getUserJoiningChallenges(authToken);
        return new Response(JSON.stringify(joiningChallenges), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    if (id) {
      const challenge = await getChallengeById(id);
      return new Response(JSON.stringify(challenge), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const challenges = await getAllChallenges();
      return new Response(JSON.stringify(challenges), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    if (error.message === "Challenge not found") {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
