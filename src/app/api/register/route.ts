import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { mongoConnect } from "../../../../lib/config/mongo";
import UserModel from "../../../../lib/models/User.Model";

mongoConnect()

export  async function POST(request:NextRequest){
    //catch the request data
    try{

        let requestData = await request.json()

        if(!requestData){
            return NextResponse.json({ error:{ message:"requested data is not found" } },{
                status:404
            })
        }

        const registerdUser = await new UserModel(requestData)

        const savedData =  await registerdUser.save()
        const savedDataObject = savedData.toObject()

        return NextResponse.json({ message:"user registerd successfully" , data:savedDataObject  } ,{
            status:200 ,
            headers:{
                "Contect-Type":"application/json"
            }
        })

    }catch(err:any){

        if (err instanceof mongoose.Error.ValidationError) {
            // If so, construct a custom error message
                console.log("mongoose error executed")
            return NextResponse.json({ error:{message:err?.message , statusText:"mongoose error"} },{status:500})
        }
        
        return NextResponse.json(err, {
            status:500
        })
    }
}