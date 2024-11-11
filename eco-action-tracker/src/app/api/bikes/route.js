import dbConnect from "@/lib/mongodb";
import {
  createBike,
  getAllBikes,
  getBikeById,
  updateBike,
  deleteBike,
} from "@/lib/bikeController";

export async function POST(req) {
  await dbConnect();
  const bikeData = await req.json();

  try {
    const bike = await createBike(bikeData);
    return new Response(
      JSON.stringify({ message: "Bike created successfully", bike }),
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
      const bike = await getBikeById(id);
      return new Response(JSON.stringify(bike), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const bikes = await getAllBikes();
      return new Response(JSON.stringify(bikes), {
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
  const { id, ...bikeData } = await req.json();

  try {
    const updatedBike = await updateBike(id, bikeData);
    return new Response(
      JSON.stringify({
        message: "Bike updated successfully",
        updatedBike,
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
    const deletedBike = await deleteBike(id);
    return new Response(
      JSON.stringify({
        message: "Bike deleted successfully",
        deletedBike,
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
