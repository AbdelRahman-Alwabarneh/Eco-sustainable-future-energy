import dbConnect from "@/lib/mongodb";
import {
  createReward,
  getAllRewards,
  getRewardById,
  updateReward,
  deleteReward,
} from "@/lib/rewardController";

export async function POST(req) {
  await dbConnect();
  const rewardData = await req.json();

  try {
    const reward = await createReward(rewardData);
    return new Response(
      JSON.stringify({ message: "Reward created successfully", reward }),
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

  try {
    if (id) {
      const reward = await getRewardById(id);
      return new Response(JSON.stringify(reward), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const rewards = await getAllRewards();
      return new Response(JSON.stringify(rewards), {
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

export async function PUT(req) {
  await dbConnect();
  const { id, ...rewardData } = await req.json();

  try {
    const updatedReward = await updateReward(id, rewardData);
    return new Response(
      JSON.stringify({
        message: "Reward updated successfully",
        updatedReward,
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

export async function DELETE(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    const deletedReward = await deleteReward(id);
    return new Response(
      JSON.stringify({
        message: "Reward deleted successfully",
        deletedReward,
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
