import { MessageModelType } from "@/models/message.model"

interface MessageType{
    data: MessageModelType[]
}

// import { client } from "@/db";

// const getMessages = async (
//     conversationId:string
// ) => {
//     const database = client.db('messenger')
//     const collection = database.collection('conversations')
//     const messages = await collection.aggregate([
//         {
//             $lookup:{
//                 from:'users',localField:'users',foreignField:'_id',as:'conversationsClients'
//             }
//         },
//         {
//             $sort:{
//                 createdAt:-1
//             }
//         }
//     ]).toArray()

//     console.log(messages[0].conversationsClients)
// }

// export default getMessages



//     const messages = await collection.aggregate([
//         {
//             $match:{
//                 isGroup:false
//             }
//         },
//         {
//             $unwind:'$userIds'
//         },
//         // {
//         //     $lookup:{
//         //         from: "users",                // The collection to join
//         //         let: { userIds: "$userIds" },   // Define variable to use in the pipeline
//         //         pipeline: [
//         //             {
//         //             $match: {
//         //                 $expr: { $in: ["$_id", "$$userIds"] }  // Match user _id with any of the userIds in the array
//         //             }
//         //             },
//         //         ],
//         //         as: "userDetails"               // The name of the new array field to add to the orders documents
//         //     }
//         // }
//         {
//             $lookup:{
//                 from:"users",
//                 localField:"userIds._id",
//                 foreignField:"_id",
//                 as:"userDetails"
//             }
//         }
//     ]).toArray()

//     console.log(messages)


const getMessages = async (
    conversationId:string
) => {
    //we use fetch as fetch automatically do cashing in nextJs

    // const { data }:any = await fetch('http://localhost:3000/getmessages',{
    //     method:'POST',
    //     body:JSON.stringify({
    //         conversationId,
    //     })
    // },).then((response) => {
    //     return response.json();
    // })

    // console.log(data)

    return "Hello"
}

export default getMessages