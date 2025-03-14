import mongoose, { Schema, Document } from "mongoose";

interface IUserVerification extends Document {
  userId: mongoose.Schema.Types.ObjectId; // Reference to User
  verifyCode: string;
  verifyCodeExpiry: Date;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

const UserVerificationSchema = new Schema<IUserVerification>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  verifyCode: { type: String, required: true },
  verifyCodeExpiry: { type: Date },
  resetToken: { type: String, default: null },
  resetTokenExpiry: { type: Date, default: null },
});

export const UserVerificationModel = mongoose.model<IUserVerification>("UserVerification", UserVerificationSchema);
