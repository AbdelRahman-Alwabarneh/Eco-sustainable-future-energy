import connect from '../../../../lib/mongodb';
import Post from '../../../models/posts';
import { NextResponse } from 'next/server';

export async function POST(req) {
    console.log("inside add comment");

    const { postId, newComments } = await req.json()

    console.log(postId);
    console.log(newComments);
    
    await connect();
    
    try {
        
        console.log("after add");
        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $push: {
                    comments: {
                        user: "670c129350b9550eb8c64e56",
                        content: newComments,
                    },
                },
            },
            { new: true }
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
