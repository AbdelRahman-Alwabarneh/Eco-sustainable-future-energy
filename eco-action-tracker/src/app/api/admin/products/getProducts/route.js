// src/app/api/admin/products/getProducts/route.js
import connectDB from "@/lib/mongodb"; // Ensure the path to your MongoDB connection is correct
import Product from "@/app/models/Product"; // Ensure the path to your Product model is correct

export async function GET(req) {
  try {
    await connectDB(); // Connect to the database
    const products = await Product.find(); // Fetch all products
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error); // Log the error
    return new Response(
      JSON.stringify({ error: "Failed to fetch products." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
