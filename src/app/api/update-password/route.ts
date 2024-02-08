import { NextRequest, NextResponse } from "next/server";
import { VerifiedForgotToken } from "../../../../lib/service/Token.service";
import bcrypt from "bcrypt";
import UserModel from "../../../../lib/models/User.Model";

let cookie_name = <string>process.env.FORGOT_COOKIE_NAME;

export async function PUT(request: NextRequest) {
  try {
    let reqData = await request.json();
    console.log("requested update data-->", reqData);
    if (!reqData?.email || !reqData?.password || !reqData?.cpassword) {
      return NextResponse.json(
        { error: { message: "Please provide your email and password" } },
        { status: 400 }
      );
    }

    let auth = await request.cookies.get(cookie_name);

    if (!auth) {
      return NextResponse.json(
        { error: { message: "Please try again" } },
        { status: 404 }
      );
    }

    let userData = await VerifiedForgotToken(auth.value, reqData.email);

    if (!userData) {
      return NextResponse.json(
        { error: { message: "User data not found" } },
        { status: 404 }
      );
    }

    let { userId } = userData;

    // Manually hash the password before updating the document
    const hashedPassword = await bcrypt.hash(reqData.password, 10);

    // Construct the update object with only the password field
    let updateObject = {
      password: hashedPassword,
    };

    let updatedUser = await UserModel.findByIdAndUpdate(userId, updateObject, {
      new: true, // To return the updated document
    });

    if (!updatedUser) {
      return NextResponse.json({ message: "Update error" }, { status: 500 });
    }

    console.log("userUpdated ", updatedUser);

    return NextResponse.json(
      { data: updatedUser, message: "User updated successfully" },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
