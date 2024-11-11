// app/api/admin/posts/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/app/models/Post";
import User from "@/app/models/User"; // Import User model
import jwt from "jsonwebtoken";

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
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await dbConnect();

  // Authenticate admin
  const admin = await authenticateAdmin(req);
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params; // Get the post ID from params
  const { content } = await req.json(); // Get the updated content from the request body

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
