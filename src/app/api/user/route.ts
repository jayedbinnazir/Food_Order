import { NextRequest, NextResponse } from "next/server";
import { mongoConnect } from "../../../../lib/config/mongo";
import UserModel from "../../../../lib/models/User.Model";
import { VerifiedToken } from "../../../../lib/service/Token.service";


let cookie_name = <string>process.env.COOKIE_NAME
mongoConnect()
export async function GET(request:NextRequest){
    try{

    //get the cookie from the request

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

        let userExist = await UserModel.findById(userId).select("-password");

        if(!userExist){
            return NextResponse.json({message:"invalid token"},{status:401})
        }

        console.log("userExist", userExist)

        return NextResponse.json({data:userExist},{
            status:200,
            headers:{
                'Content-Type':"application/json"
            }
        })

    }catch(err){

        return NextResponse.json({error:{message:"internal server error"}},{status:500})


    }
}