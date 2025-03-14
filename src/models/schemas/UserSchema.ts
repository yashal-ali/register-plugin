import mongoose, { Schema, Document } from "mongoose";

// Define TypeScript interface for User
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

// Define Mongoose schema
const UserSchema = new Schema<IUser>({
  userId: { type: String, unique: true, default: () => new mongoose.Types.ObjectId().toHexString() },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String },
  isVerified: { type: Boolean, default: false },
});

// Export the typed model
export const UserModel = mongoose.model<IUser>("User", UserSchema);
