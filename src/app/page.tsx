"use client"
import { useAuth } from "@/components/AuthProvider";
import HomeMenue from "@/components/layout/HomeMenue";
import { Typography } from "@mui/material";
import Hero from "../components/layout/Hero";

export default function Home() {

   const auth =  useAuth()


   if(auth?.loading){
    return <Typography variant="h3" align="center" sx={{pt:6}} >...Loading</Typography>
   }

   if(auth?.error){
    <h2>{auth?.error}</h2>
   }

  return (
    <>
    <div>
      <header>profile</header>
      <p>{auth?.user?.name}</p>
      <p>{auth?.user?.email}</p>
    </div>
      <Hero />
      <HomeMenue />
    </>
  );
}
