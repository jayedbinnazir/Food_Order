import { NextResponse, type NextRequest } from 'next/server';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

   try{

    let path = request.nextUrl.pathname ;
    let auth = request.cookies.get(process.env.COOKIE_NAME as string)
    console.log("middleware--->",path)
    console.log("middleware----->",auth)

    let publicpath = [ "/login" , "/register" ] ;

    if(publicpath.includes(path) && auth){
        return  NextResponse.redirect(new URL( "/" , request.url))
    }
    if(!publicpath.includes(path)&& !auth){
        return NextResponse.redirect(new URL('/login', request.url ))
    }


   }catch(err:any){
    console.log("there was an error", err)
   }
   

//   return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:[
    "/",
    "/about",
    "/login",
    "/register"
  ],
}