import connect from '../../../../lib/mongodb';
import Post from '../../../models/posts';
import { NextResponse } from 'next/server';

export async function GET(req) {
    console.log("inside get posts");
    await connect();

    try {
        const posts = await Post.find({})
            .populate({
                path: 'user', // Populate the user who created the post
                select: 'firstName lastName picture' // Select the fields you need from the User model
            })
            .populate({
                path: 'comments.user', // Populate user in comments
                select: 'firstName lastName picture' // Select the fields you need
            })
            .populate({
                path: 'comments.replies.author', // Populate author in replies
                select: 'firstName lastName picture' // Select the fields you need
            }).sort({ _id: -1 });

        console.log(posts);

        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ message: 'Error fetching posts', error }, { status: 500 });
    }
}
