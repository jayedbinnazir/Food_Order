//Token Generation
import jwt from 'jsonwebtoken';

import { ObjectId } from 'mongodb';


type UserInfo = {
    userId: typeof ObjectId;
    name: string;
    email: string;
};

let SECRET=process.env.JWT_SECRET

export const GenerateToken = async (user: UserInfo): Promise<string | null> => {
    try {
        let token = await jwt.sign(user, SECRET as string, {
            expiresIn: '2d',
        });

        return token;
    } catch (err) {
        // Handle error (e.g., log it or throw)
        console.error('Error generating token:', err);
        return null;
    }
};


//verification of token 

export const VerifiedToken = async (token: string): Promise<UserInfo | null> => {
    try {
        let verifiedUser = await jwt.verify(token, SECRET as string);

        console.log("Verified token data", verifiedUser);

        return verifiedUser as UserInfo;
    } catch (err) {
        console.log("Failed to verify the token", err);
        return null;
    }
};
