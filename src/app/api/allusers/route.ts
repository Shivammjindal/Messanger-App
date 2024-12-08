import { NextRequest,NextResponse } from "next/server";
import { User } from "@/models/index";

export const POST = async (request:NextRequest, response:NextResponse) => {

    try {

        const {email} = await request.json()
        const users = await User.find({
            $nor:[
                {email}
            ],
        }).sort({createdAt:-1})

        return NextResponse.json({
            users
        })
    } catch (error) {
        return new NextResponse('Internal Server Error',{status:500})
    }
}