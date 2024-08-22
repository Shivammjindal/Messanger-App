import { Messages } from "@/models/message.model";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/db";

connect()

export async function POST(request: NextRequest, response: NextResponse){

    try {
        const { message } = await request.json();
        console.log(message)
        await Messages.create({
            body:message
        })
    } catch (error) {
        console.log(error)
    }

    return NextResponse.json({created:201})
}