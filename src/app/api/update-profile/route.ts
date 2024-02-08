import { NextRequest, NextResponse } from "next/server";
import { mongoConnect } from "../../../../lib/config/mongo";
import UserModel from "../../../../lib/models/User.Model";
import { VerifiedToken } from "../../../../lib/service/Token.service";


let cookie_name = <string>process.env.COOKIE_NAME
mongoConnect()

export async function PUT(request:NextRequest){

    try{

    //get the cookie from the request
        
        let reqData = await request.json()
        console.log("requested update data-->", reqData)
        if(!reqData?.email || !reqData?.name){
            return NextResponse.json({error:{message:"please provide your information first"}},{status:400})
        }
        let {name:reqName , email:reqEmail } = reqData ;

        let auth = await request.cookies.get(cookie_name)

        if(!auth){
           return  NextResponse.json({error:{message:"unauthorized person , please login first"}},{status:401})
        }

        //if auth is found then decode the data from here

        let userData = await VerifiedToken(auth.value)

        if(!userData){
            return NextResponse.json({error:{message:"user data not found"}}, {status:404})
        }

        let {userId} = userData ;

        let updatedUser = await UserModel.findByIdAndUpdate(userId , reqData )

        if(!updatedUser){
            return NextResponse.json({message:"update error"},{status:500})
        }

        console.log("userUpdated ", updatedUser)

        return NextResponse.json({data:updatedUser , message:"user updated successfully"},{
            status:200,
            headers:{
                'Content-Type':"application/json"
            }
        })

    }catch(err){

        return NextResponse.json({error:{message:"internal server error"}},{status:500})


    }
}