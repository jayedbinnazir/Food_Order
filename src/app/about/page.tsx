"use client"
import { useAuth } from "@/components/AuthProvider"
import { NextRequest } from "next/server"




const About = (req:NextRequest) => {

  const auth = useAuth()

  const user = auth?.user ;

  console.log("about pase" , user )

  return (
    <div>
      {user?.email}-{user?.name}
    </div>
  )
}

export default About