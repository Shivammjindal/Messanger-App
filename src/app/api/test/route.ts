import { NextRequest,NextResponse } from "next/server"

export async function GET(request:NextRequest, response:NextResponse){
    // console.log(client)
    return NextResponse.json({
        message:"ok",
        status:200
    })
}