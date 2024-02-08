"use client"
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../AuthProvider";


const Header = () => {

  const router = useRouter()

  let [display, setDisplay ] = useState('block')

  const authinfo = useAuth()

  if(!authinfo){
    console.log("info is not provided")
  }

  const { logMessage , logout } = authinfo || {}


  const handleLogout=async()=>{
    await authinfo?.logout() 
    setTimeout(()=>{
      setDisplay("none")
    },1000)
  }


  console.log(display)
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">
          PIZZA ST
        </Link>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={""}>Home</Link>
          </li>
          <li>
            <details>
              <summary>Menue</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <a>menue 1</a>
                </li>
                <li>
                  <a>menue 2</a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <Link href={"/about"}>About</Link>
          </li>

          <li>
            <Link href={""}>Contact</Link>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
            <li>
              <button onClick={handleLogout} >logout</button>
            </li>
            <li>
              <Link href={"/register"}>Register</Link>
            </li>
           
          </ul>
        </div>
      </div>
      <Box>
        <Typography variant="h2" color={"secondary"} display={display}  > {logMessage} </Typography>
      </Box>
    </div>
  );
};

export default Header;
