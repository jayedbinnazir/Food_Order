"use client";
import GoogleIcon from "@mui/icons-material/Google";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type User = {
  email: string;
};

const ForgotPage = () => {
  const [errorMessage, setError] = useState<any>(null);
  const [loginMessage, setLoginMessage] = useState("");
  const form = useForm<User>({
    defaultValues: {
      email: "",
    },
  });

  const { register, handleSubmit, reset, formState } = form;

  const { isSubmitting } = formState;

  const onSubmit = async (data: User) => {
    console.log(data);
    try {
      const responsedData = await fetch("/api/forgot-password", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!responsedData.ok) {
        const errorData = await responsedData.json();
        setError(errorData?.error?.message);
        console.log("respond error data", errorData);
      } else {
        const responseData = await responsedData.json();
        console.log(responseData);
        setLoginMessage(responseData.message);
        reset();
      }
    } catch (err: any) {
      console.log("client catch block Unexpected error:", err.message);
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
              Find Your Account
            </Typography>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
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
                <p className="text-red-600 text-center text-balance w-80 font-bold ">
                  {errorMessage}
                </p>
              )}
              {loginMessage && (
                <p className="text-green-600 text-center">{loginMessage}</p>
              )}

              <div className="form-control mt-6">
                <button className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "...Sending" : "Send Email"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ForgotPage;
