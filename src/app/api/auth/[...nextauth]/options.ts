import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"
import { pusherServer } from "@/app/libs/pusher";
import { User } from "@/models";
import { connect } from "@/app/db/connection"

export const authOptions: NextAuthOptions = {
    // adapter: MongoDBAdapter(client) as Adapter,
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        Credentials({
            //user which provide username ans password can login through this service and can login that's why we have thease checks.
            name:'credentials',
            credentials:{
                email: { label:'email', type:'text' },
                password: { label:'password', type:'password' }
            },
            async authorize(credentials){

                await connect().then(() => console.log('User db connected'))

                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid Credentials')
                }

                const user = await User.findOne({email: credentials.email})

                if(!user || !user?.hashedPassword){
                    throw new Error('Invalid Credentials')
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials?.password,
                    user.hashedPassword
                )

                if(!isCorrectPassword){
                    throw new Error('Invalid Credentials')
                }

                return user
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session:{
        strategy:'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async signIn({ user, account, profile, email, credentials }) {

            await connect().then(() => console.log('User db connected'))

            // console.log("User ",user)
            // console.log("Account ",account)
            // console.log("Profile ",profile)
            // console.log("Email ",email)
            // console.log("Credentials ",credentials)

            const userExist = await User.findOne({ email : email})
            // if(!userExist && !credentials?.email){
                // await User.create({
                //     name : profile?.name,
                //     email : profile?.email,
                //     image : profile?.image
                // })
            // }
            console.log("User Exist ", userExist)

            const users = await User.find({ email : {$ne: user.email} })

            users.map(async (currentUser) => {
                console.log('Sending Trigger ',currentUser.email);
                await pusherServer.trigger(currentUser.email!,'userlist:update',{user})
            })
            return true
        },
        async session({session,user,token}){
            return session
        }
    },
}