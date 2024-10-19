import PusherServer from "pusher"
import PusherClient from "pusher-js"

console.log("App id : ",process.env.GITHUB_ID)
console.log("Api Key : ",process.env.PUSHER_APP_KEY)
console.log("APi Secret : ",process.env.PUSHER_APP_SECRET)
console.log("Api cluster : ",process.env.PUSHER_APP_CLUSTER)

export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID! || "1869165",
    key: process.env.PUSHER_APP_KEY! || "7f23e6411c6c541d67a5",
    secret: process.env.PUSHER_APP_SECRET! || "859f34d81abb6b845825",
    cluster: process.env.PUSHER_APP_CLUSTER! || "ap2",
    useTLS: true
})

export const pusherClient = new PusherClient(
    process.env.PUSHER_APP_KEY! || "7f23e6411c6c541d67a5",
    {
        cluster:process.env.PUSHER_APP_CLUSTER! || "ap2"
    }
)