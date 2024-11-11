// app/api/admin/products/getProducts/[id]/route.js
import dbConnect from "@/lib/mongodb"; 
import Product from "@/app/models/Product";
export async function GET(req, { params }) {
  const { id } = params;

  await dbConnect(); // Connect to the database

  try {
    const product = await Product.findById(id); // Find product by ID
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
