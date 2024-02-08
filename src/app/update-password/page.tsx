"use client";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type User = {
  email: string;
  password: string;
  cpassword: string;
};

type ParamsProp = {
  searchParams: {
    token: string;
  };
};

const UpdatePassword = (params: ParamsProp) => {
  const router = useRouter();
  const token = params?.searchParams?.token;
  console.log("params", params);
  if (!token) {
    router.push("/login");
  }
  const [errorMessage, setError] = useState<any>(null);
  const [updateMessage, setUpdateMessage] = useState("");
  const form = useForm<User>({
    defaultValues: {
      email: "",
      password: "",
      cpassword: "",
    },
  });

  const { register, handleSubmit, reset, formState } = form;

  const { isSubmitting } = formState;

  const onSubmit = async (data: User) => {
    console.log(data);
    try {
      const responsedData = await fetch("/api/update-password", {
        method: "PUT",
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
        setUpdateMessage(responseData.message);
        reset();
        router.replace("/");
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
              Update Password
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("cpassword")}
                />
              </div>

              {errorMessage && (
                <p className="text-red-600 text-center text-balance w-80 font-bold ">
                  {errorMessage}
                </p>
              )}
              {updateMessage && (
                <p className="text-green-600 text-center">{updateMessage}</p>
              )}

              <div className="form-control mt-6">
                <button className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "...Updating" : "update-profile"}
                </button>
              </div>
              <div className="form-control mt-6"></div>
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default UpdatePassword;
