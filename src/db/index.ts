import mongoose from "mongoose"
import { MongoClient,ServerApiVersion } from "mongodb"

let client : MongoClient
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
      _mongoClient?: MongoClient
    }
   
    if (!globalWithMongo._mongoClient) {
      globalWithMongo._mongoClient = new MongoClient(process.env.DATABASE_URL!,options)
    }
    client = globalWithMongo._mongoClient
}

const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL!)
    } catch (error) {
        console.log("Unable to Connect with mongodb")
    }
}

export { connect, client }