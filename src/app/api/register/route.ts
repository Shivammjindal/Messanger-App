import bcrypt from "bcrypt"
import {connect} from "@/db"
import {NextRequest, NextResponse} from "next/server"
import { User } from "@/models/user.model";

connect().then(() => {console.log("MongoDb connected")});

export async function POST(request:NextRequest, response:NextResponse){

    try {
        //extracting data from frontend
        const body = await request.json()

        const {
            name,
            email,
            password
        } = body

        console.log(name,email,password);

        if(!name || !email || !password){
            return new NextResponse('All Fields are required',{status:400})
        }

        const usr = await User.findOne({
            email
        })

        if(usr){
            return new NextResponse('User Already Exists',{status:400})
        }

        const hashedPassword = await bcrypt.hash(password,12)
        
        const user = await User.create({
            name,
            email,
            hashedPassword
        })

        return NextResponse.json(user)
    } catch (error) {
        console.log("In Resistration Section",error)
        return new NextResponse('Internal', {status:500})
    }
}