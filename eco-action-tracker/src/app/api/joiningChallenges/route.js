import dbConnect from "@/lib/mongodb";
import {
  createJoiningChallenge,
  getAllJoiningChallenges,
  getJoiningChallengeById,
  getUsersByChallengeId,
  getJoinedChallengesByUserId,
} from "@/lib/joiningChallengeController";
import JoiningChallenge from "@/app/models/JoiningChallenge";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();

  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return new Response(JSON.stringify({ message: "No token provided" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userId = decoded.id;
    if (!userId) {
      throw new Error("Invalid token: userId not found");
    }

    const challengeData = await req.json();
    challengeData.userId = userId;

    const existingChallenge = await JoiningChallenge.findOne({
      userId,
      challengeId: challengeData.challengeId,
    });

    if (existingChallenge) {
      return new Response(
        JSON.stringify({ message: "You have already joined this challenge." }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const challenge = await createJoiningChallenge(challengeData);

    return new Response(
      JSON.stringify({
        message: "Joining challenge created successfully",
        challenge,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    if (userId) {
      const challenges = await getJoinedChallengesByUserId(userId);
      return new Response(JSON.stringify(challenges), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const challengeId = searchParams.get("challengeId");

    if (challengeId) {
      const users = await getUsersByChallengeId(challengeId);
      return new Response(JSON.stringify(users), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else if (id) {
      const challenge = await getJoiningChallengeById(id);
      return new Response(JSON.stringify(challenge), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const challenges = await getAllJoiningChallenges();
      return new Response(JSON.stringify(challenges), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
