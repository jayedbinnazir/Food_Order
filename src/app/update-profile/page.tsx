"use client";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type User = {
  name:string
  email: string;
  password: string;
};

const UpdatePage = () => {
  const router = useRouter();
  const [errorMessage, setError] = useState<any>(null);
  const [updateMessage, setUpdateMessage] = useState("");
  const form = useForm<User>({
    defaultValues: {
        name:"",
      email: "",
      
    },
  });

  const { register, handleSubmit, reset , formState } = form;

  const { isSubmitting  } = formState;

  const onSubmit = async (data: User) => {
    console.log(data);
    try {
      const responsedData = await fetch("/api/update-profile", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!responsedData.ok) {
        const errorData = await responsedData.json();
         setError(errorData?.error?.message);
        console.log("respond error data",errorData)
      } else {
        const responseData = await responsedData.json();
        console.log(responseData);
        setUpdateMessage(responseData.message);
        reset();
        router.replace("/");
      }
    } catch (err:any) {
      console.log("client catch block Unexpected error:",err.message);
    }
  };

  return (
    <Box>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
            <Typography
              variant="h5"
              align="center"
              position={"relative"}
              top={"30px"}
            >
              Update User Information
            </Typography>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-80"
                  {...register("name")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered w-80"
                  {...register("email")}
                />
              </div>
             

              {errorMessage && (
              <p className="text-red-600 text-center text-balance w-80 font-bold ">{errorMessage}</p>
            )}
            {updateMessage && (
              <p className="text-green-600 text-center">{updateMessage}</p>
            )}

              <div className="form-control mt-6">
                <button className="btn btn-primary" disabled={isSubmitting} >{isSubmitting?"...Updating":"update-profile"}</button>
              </div>
              <div className="form-control mt-6">
               
              </div>
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default UpdatePage;
