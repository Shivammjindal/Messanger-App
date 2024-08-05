import NextAuth, {AuthOptions} from "next-auth";
import Credentials, { CredentialsProvider } from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"
import {connect} from "@/db/index";
import {User} from "@/models/user.model"
import bcrypt from "bcrypt"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { client } from "@/db/index"
import { Adapter } from "next-auth/adapters";
import { Profile } from "@/models/profile.model";

connect()

export const authOptions: AuthOptions = {
    adapter: MongoDBAdapter(client) as Adapter,
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

                console.log("isCorrectPassword",isCorrectPassword)

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
            console.log("User ",user)
            console.log("Account ",account)
            console.log("Profile ",profile)
            await Profile.create({
                name:profile?.name,
                email:profile?.email,
                image:profile?.image,
                sub: profile?.sub,
            })
            console.log("Email ",email)
            console.log("Credentials ",credentials)
            return true
        },
    }
}

const handler = NextAuth(authOptions)

export {
    handler as GET,
    handler as POST
}