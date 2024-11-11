import connect from '../../../lib/mongodb';
import Post from '../../models/posts';
import User from '../../models/User';
import { NextResponse } from 'next/server';

export async function GET(req) {
    console.log("inside get posts");
    await connect();

    try {
        // const posts = await Post.find({})
        //     .populate({
        //         path: 'comments.user', // Populate user in comments
        //         select: 'firstName lastName picture' // Select the fields you need
        //     })
        //     .populate({
        //         path: 'comments.replies.author', // Populate author in replies
        //         select: 'firstName lastName picture' // Select the fields you need
        //     });

        // const user = await User.findById("670a6108abc6e7a8780f5431");

        // console.log(posts);
        // console.log(".............................");
        // console.log(user);
        // return NextResponse.json({ user }, { status: 200 });
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ message: 'Error fetching posts', error }, { status: 500 });
    }
}
