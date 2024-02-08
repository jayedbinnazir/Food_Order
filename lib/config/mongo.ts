 import mongoose from "mongoose";

 let URI=process.env.MONGO_URI ;

 export const mongoConnect=async()=>{
    try{
        await mongoose.connect(URI as string)
        console.log(`database connenctted with ${mongoose.connection.host}`)
    } catch(err){
        console.log('connection failed', err)
        mongoose.disconnect()
        process.exit(1)
    }
 }