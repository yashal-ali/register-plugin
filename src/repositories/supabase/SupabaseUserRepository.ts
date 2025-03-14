import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { UserModel } from "../../models/schemas/UserSchema";
import { UserVerificationModel } from "../../models/schemas/UserVerificationSchema";
import { IUserRepository } from "../IUserRepository";
import { connectDB } from "../../config/database";

export class MongoUserRepository implements IUserRepository {
    updateUserFields(userId: string, extraFields: Record<string, any>): Promise<{ success: boolean; message: string; user: any; }> {
        throw new Error("Method not implemented.");
    }
    async registerUser(
        firstName: string,
        lastName: string,
        userName: string,
        email: string,
        password: string,
        extraFields?: Record<string, any>
      ): Promise<{ success: boolean; message: string; userId?: any; verifyCode?: string }> {
        try {
          console.log("📌 Received Data:", { firstName, lastName, userName, email, password, extraFields });
    
          if (!firstName || !lastName || !userName || !email || !password) {
            return { success: false, message: "All fields are required." };
          }
    
          await connectDB();
    
          const existingUser = await UserModel.findOne({ email });
          if (existingUser) {
            return { success: false, message: "Email already registered." };
          }
    
          const hashedPassword = await bcrypt.hash(password, 10);
          const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
          const verifyCodeExpiry = new Date(Date.now() + 3600000);
    
          // Create new user
          const newUser = new UserModel({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
            isVerified: false,
            ...extraFields,
          });
    
          await newUser.save();
    
          // Create verification entry linked to the user
          const userVerification = new UserVerificationModel({
            userId: newUser._id,
            verifyCode,
            verifyCodeExpiry,
          });
    
          await userVerification.save();
    
          return { 
            success: true, 
            message: "User registered successfully!", 
            userId:  userVerification.userId,
            verifyCode 
          };
          
        } catch (error: any) {
          console.error("❌ Error registering user:", error);
          return { success: false, message: "An error occurred."};
        }
      }
  async verifyUser(userName:string, code:string) {
    const user = await UserModel.findOne({ userName });
    if (!user) return { success: false, message: "User not found." };

    const verification = await UserVerificationModel.findOne({ userId: user._id });
    if (!verification || verification.verifyCode !== code || new Date(verification.verifyCodeExpiry) < new Date()) {
      return { success: false, message: "Invalid or expired verification code." };
    }

    user.isVerified = true;
    await user.save();
    return { success: true, message: "Account verified!" };
  }

  async forgotPassword(email:string, url:string) {
    const user = await UserModel.findOne({ email });
    if (!user) return { success: false, message: "User not found." };

    const resetToken = uuid();
    const resetTokenExpiry = new Date(Date.now() + 3600000);
    let verification = await UserVerificationModel.findOne({ userId: user._id });

    if (verification) {
      verification.resetToken = resetToken;
      verification.resetTokenExpiry = resetTokenExpiry;
      await verification.save();
    } else {
      verification = new UserVerificationModel({ userId: user._id, resetToken, resetTokenExpiry });
      await verification.save();
    }

    const resetLink = `${url}/reset-password?token=${resetToken}`;
    return { success: true, message: "Password reset link sent.", resetLink };
  }

  async resetPassword(token:string, newPassword:string) {
    const verification = await UserVerificationModel.findOne({ resetToken: token });
    if (!verification ) {
      return { success: false, message: "Invalid or expired reset token." };
    }

    const user = await UserModel.findById(verification.userId);
    if (!user) return { success: false, message: "User not found." };

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    verification.resetToken = undefined;
    verification.resetTokenExpiry = undefined;
    await verification.save();

    return { success: true, message: "Password reset successfully." };
  }
}
