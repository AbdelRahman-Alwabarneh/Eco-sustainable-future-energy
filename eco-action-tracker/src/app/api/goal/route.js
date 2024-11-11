import dbConnect from "@/lib/mongodb";
import {
  createGoal,
  getUserGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
} from "@/lib/goalController";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();
  const goalData = await req.json();

  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return new Response(
      JSON.stringify({ message: "Authorization token is missing" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    const goal = await createGoal({ ...goalData, userId });

    return new Response(
      JSON.stringify({ message: "Goal created successfully", goal }),
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

// Function to handle GET requests for fetching goals
export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const id = searchParams.get("id");

  try {
    if (id) {
      const goal = await getGoalById(id);
      return new Response(JSON.stringify(goal), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else if (userId) {
      const goals = await getUserGoals(userId);
      return new Response(JSON.stringify(goals), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 400,
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

// Function to handle PUT requests for updating a goal
export async function PUT(req) {
  await dbConnect();
  const { id, ...goalData } = await req.json();

  try {
    const updatedGoal = await updateGoal(id, goalData);
    return new Response(
      JSON.stringify({
        message: "Goal updated successfully",
        updatedGoal,
      }),
      {
        status: 200,
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

// Function to handle DELETE requests for deleting a goal
export async function DELETE(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    const deletedGoal = await deleteGoal(id);
    return new Response(
      JSON.stringify({
        message: "Goal deleted successfully",
        deletedGoal,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
