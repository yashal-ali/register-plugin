import bcrypt from "bcryptjs";
import { UserModel } from "./../../../models/schemas/UserSchema";
import { UserVerificationModel } from "./../../../models/schemas/UserVerificationSchema";
import { connectDB } from "./../../../config/database";
import { v4 as uuid } from "uuid";

export const registerUser = async (
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  password: string,
  extraFields?: Record<string, any>
) => {
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

    return { success: true, message: "User registered successfully!", verifyCode, userId: newUser._id };
  } catch (error: any) {
    console.error("❌ Error registering user:", error);
    return { success: false, message: "An error occurred.", error: error.message };
  }
};

export const verifyUser = async (userName: any, code: any) => {
    try {
      await connectDB();
  
      console.log("📌 Received Data:", { userName, code });
  
      if (!userName || !code) {
        console.error("❌ Missing required fields");
        return { success: false, message: "Username and code are required." };
      }
  
      const user = await UserModel.findOne({ userName });
  
      if (!user) {
        console.error("❌ User not found");
        return { success: false, message: "User not found." };
      }
  
      const verification = await UserVerificationModel.findOne({ userId: user._id });
  
      if (!verification) {
        return { success: false, message: "No verification record found." };
      }
  
      const isCodeValid = verification.verifyCode === code;
      const isCodeNotExpired = new Date(verification.verifyCodeExpiry) > new Date();
  
      if (isCodeValid && isCodeNotExpired) {
        await user.save();
        console.log("✅ Account verified successfully:", userName);
        return { success: true, message: "Account verified successfully!" };
      }
  
      if (!isCodeNotExpired) {
        console.warn("⚠️ Verification code expired for:", userName);
        return { success: false, message: "Verification code expired. Please request a new code." };
      }
  
      console.warn("⚠️ Incorrect verification code for:", userName);
      return { success: false, message: "Incorrect verification code." };
    } catch (error: any) {
      console.error("❌ Error verifying user:", error);
      return { success: false, message: "Error verifying user.", error: error.message };
    }
  };
  
  export const forgotPassword = async (email: any, url: any) => {
    try {
      await connectDB();
  
      console.log("📧 Forgot Password Request:", { email });
  
      const user = await UserModel.findOne({ email }) ;
      if (!user) {
        console.error("❌ User not found");
        return { success: false, message: "User not found." };
      }
  
      const resetToken = uuid();
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1-hour expiry
  
      let verification = await UserVerificationModel.findOne({ userId: user._id }) 
      if (verification) {
        verification.resetToken = resetToken;
        verification.resetTokenExpiry = resetTokenExpiry;
        await verification.save();
      } else {
        verification = new UserVerificationModel({
          userId: user._id,
          resetToken,
          resetTokenExpiry,
        });
        await verification.save();
      }
  
      const resetLink = `${url}/reset-password?token=${resetToken}`;
      console.log("✅ Password reset email sent:", resetLink);
  
      return { success: true, message: "Password reset email sent.", resetLink };
    } catch (error: any) {
      console.error("❌ Error in Forgot Password:", error);
      return { success: false, message: "Internal server error", error: error.message };
    }
  };
  export const resetPassword = async (token: any, newPassword: any) => {
    try {
      await connectDB();
  
      console.log("🔑 Reset Password Request:", { token });
  
      const verification = await UserVerificationModel.findOne({ resetToken: token }) 
  
      if (!verification || new Date(verification.resetTokenExpiry!) < new Date()) {
        console.error("❌ Invalid or expired reset token");
        return { success: false, message: "Invalid or expired reset token." };
      }
  
      const user = await UserModel.findById(verification.userId) 
      if (!user) {
        console.error("❌ User not found");
        return { success: false, message: "User not found." };
      }
      else{
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
      }
  
      verification.resetToken = undefined;
      verification.resetTokenExpiry = undefined;
      await verification.save();
  
      console.log("✅ Password reset successfully");
      return { success: true, message: "Password reset successfully." };
    } catch (error: any) {
      console.error("❌ Error resetting password:", error);
      return { success: false, message: "Error resetting password.", error: error.message };
    }
  };
  
  
  export const updateUserFields = async (userId: string, extraFields: Record<string, any>) => {
    try {
      console.log("🔄 Updating User Fields:", { userId, extraFields });
  
      const user = await UserModel.findById(userId);
      if (!user) {
        return { success: false, message: "User not found." };
      }
  
      // ✅ Merge new fields into the existing user
      Object.assign(user, extraFields);
      
      await user.save();
  
      console.log("✅ User updated successfully!");
      return { success: true, message: "User updated successfully!", user };
    } catch (error: any) {
      console.error("❌ Error updating user fields:", error);
      return { success: false, message: "An error occurred.", error: error.message };
    }
  };