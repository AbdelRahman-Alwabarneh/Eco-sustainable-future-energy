import connect from '../../../../lib/mongodb';
import User from '../../../models/User';
import { NextResponse } from 'next/server';

export async function GET(req) {
    console.log("inside get user");
    await connect();

    try {
        const user = await User.findById("670c129350b9550eb8c64e56");

        // console.log(user);

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ message: 'Error fetching posts', error }, { status: 500 });
    }
}
