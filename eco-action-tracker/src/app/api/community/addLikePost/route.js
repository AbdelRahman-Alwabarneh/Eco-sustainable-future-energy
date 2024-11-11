import connect from '../../../../lib/mongodb';
import Post from '../../../models/posts';
import { NextResponse } from 'next/server';

export async function POST(req) {
    console.log("inside add like to post");

    const { postId } = await req.json()

    // console.log(postId);

    await connect();

    try {

        // console.log("after add");
        const post = await Post.findByIdAndUpdate(
            postId,
            { $inc: { likes: 1 } }, // Increment likes by 1
            { new: true } // Return the updated document
        );

        if (!post) {
            return NextResponse.json({ message: 'Error add comment' });
        }


        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error('Error add comment:', error);
        return NextResponse.json({ message: 'Error add comment', error }, { status: 500 });
    }
}
