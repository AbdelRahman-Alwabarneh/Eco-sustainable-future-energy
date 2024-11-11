// src/app/api/admin/products/create.js
import connectDB from "@/lib/mongodb"; 
import Product from "@/app/models/Product";

export async function POST(req) {
  try {
    await connectDB(); // Connect to the database

    const { name, description, price, category, stock, ecoBenefits } = await req.json(); // Parse the request body

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      ecoBenefits,
    });

    // Save the product to the database
    await newProduct.save();

    return new Response(JSON.stringify({ message: "Product created successfully!" }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(JSON.stringify({ error: "Failed to create product." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
