import connect from '../../../../lib/mongodb';
import Post from '../../../models/posts';
import { NextResponse } from 'next/server';

export async function POST(req) {
    // console.log("inside add like to post");

    const { postId, commentId, replyId } = await req.json()

    // console.log(postId);

    await connect();

    try {

        // console.log("after add");
        const post = await Post.findOneAndUpdate(
            { _id: postId, 'comments._id': commentId, 'comments.replies._id': replyId },
            { $inc: { 'comments.$[].replies.$[reply].likes': 1 } }, // Increment the likes for the specific reply
            {
                new: true, // Return the updated document
                arrayFilters: [{ 'reply._id': replyId }] // Filter for the specific reply
            }
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
