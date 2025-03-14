import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    userId: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    role?: string;
    isVerified: boolean;
}
export declare const UserModel: mongoose.Model<any, {}, {}, {}, any, any>;
