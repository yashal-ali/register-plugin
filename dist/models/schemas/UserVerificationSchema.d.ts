import mongoose, { Document } from "mongoose";
interface IUserVerification extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    verifyCode: string;
    verifyCodeExpiry: Date;
    resetToken?: string;
    resetTokenExpiry?: Date;
}
export declare const UserVerificationModel: mongoose.Model<IUserVerification, {}, {}, {}, mongoose.Document<unknown, {}, IUserVerification> & IUserVerification & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
