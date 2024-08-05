import connect from "@/db"
import { client } from "@/db/lib/db"
import { NextRequest,NextResponse } from "next/server"
connect()

export async function GET(request:NextRequest, response:NextResponse){
    // console.log(client)
    return NextResponse.json({
        message:"ok",
        status:200
    })
}