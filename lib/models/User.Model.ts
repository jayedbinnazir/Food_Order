import bcrypt from "bcrypt";
import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    // ConfirmPassword(): Promise<void>;
}

const UserSchema = new Schema<IUser>({
    name:{
        type:String ,
        required:true,
    },
    
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            validate: {
                validator: (value: string) => {
                    if (value.length < 5) {
                        throw new Error("Password should be at least 5 characters");
                    }
                },
            },
        }
}, {
    timestamps: true,
});


//hash the password before save


UserSchema.pre("save", async function (next) {
    let user = this as IUser;

    if (!user.isModified("password")) {
        return next();
    }

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error:any) {
        return next(error);
    }
});

//confirm the password

UserSchema.methods.ConfirmPassword = async function (string_password:string) {
    const isMatch = bcrypt.compare(string_password, this.password )
    return isMatch ;
}
     



const UserModel = mongoose.models.user || mongoose.model<IUser>("user", UserSchema);

export default UserModel;
