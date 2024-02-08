import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

 export async function GET(request:NextRequest){
     try{
        let response = NextResponse.json({message:"logout successfull"}, {status:200})
        cookies().delete(process.env.COOKIE_NAME as string)
        
        return response ;

     } catch(err){
        return NextResponse.json({error:{message:"there was an error"}},{ status:500 })
     }
 }