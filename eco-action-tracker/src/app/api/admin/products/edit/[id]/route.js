// src/app/api/admin/products/[id]/route.js
import connectDB from "@/lib/mongodb";
import Product from "@/app/models/Product";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const product = await Product.findById(params.id); // Fetch the specific product
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch product." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    await connectDB();
    const product = await Product.findByIdAndUpdate(params.id, data, {
      new: true,
    }); // Update the product
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update product." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
