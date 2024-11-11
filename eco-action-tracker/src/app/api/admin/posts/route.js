import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/app/models/Post";
import User from "@/app/models/User"; 
import jwt from "jsonwebtoken";
import mongoose from "mongoose"; 

const authenticateAdmin = async (req) => {
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select("role");

    if (user?.role !== "admin") {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
};

export async function GET(req) {
  await dbConnect();

  // Authenticate admin
  const admin = await authenticateAdmin(req);
  if (!admin) {
    console.error("Admin authentication failed");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // Get pagination parameters
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const [posts, totalCount] = await Promise.all([
      Post.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Post.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      posts,
      currentPage: page,
      totalPages,
      totalPosts: totalCount,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message }, // Include error message
      { status: 500 }
    );
  }
}

//create post
export async function POST(req) {
  await dbConnect();

  // Authenticate admin
  const admin = await authenticateAdmin(req);
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content, image } = await req.json();

    // Create a new post
    const newPost = new Post({
      post_id: new mongoose.Types.ObjectId(), // Assign a new post ID
      user: admin.id, // Use the admin's ID
      time: new Date(),
      content,
      image,
      likes: 0, // Default likes
      comments: [], // Default comments
    });

    await newPost.save();

    return NextResponse.json(
      { message: "Post created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
