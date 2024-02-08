//here is our login functionality

import { NextRequest, NextResponse } from "next/server";
import { mongoConnect } from "../../../../lib/config/mongo";
import UserModel from "../../../../lib/models/User.Model";
import { GenerateToken } from "../../../../lib/service/Token.service";

mongoConnect()
export async function POST(request:NextRequest){
    try{

        const reqData = await request.json() ;
         console.log("requested data" , reqData);

            const {email:reqEmail , password:reqPass  } = reqData ;
         //lets query on the database for the request 

         const user = await UserModel.findOne({email:reqEmail})
         console.log("database user", user)

         //let us see the user exist or not first
         if(!user){
            return NextResponse.json({error:{message:"user not exists"}},{status:404})
         } 

         //if exists then check the password

            let validPassword = await user.ConfirmPassword(reqPass)
            if(!validPassword){
                return NextResponse.json({error:{message:"incorrect password"}},{status:402})
            }

            //if password is matched then generate the token

            let { _id:id, email, name  } = user.toObject()

            console.log("bson id", id)

            let userInfo = {
                userId:id,
                email:email,
                name:name,
            }

            let token = await GenerateToken(userInfo)
            console.log("token-->", token)

            let response = NextResponse.json({message:"login successfull"},{status:200})
            response.cookies.set(process.env.COOKIE_NAME as string , token as string);

            return response

    }catch(err:any){


        //if any error occured in try block reading then catch it 
        console.log(err.message)
        return NextResponse.json({error:{message:"internal server error"}},{status:500})

    }
}