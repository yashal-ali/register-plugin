"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserFields = exports.resetPassword = exports.forgotPassword = exports.verifyUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema_1 = require("./../../../models/schemas/UserSchema");
const UserVerificationSchema_1 = require("./../../../models/schemas/UserVerificationSchema");
const database_1 = require("./../../../config/database");
const uuid_1 = require("uuid");
const registerUser = (firstName, lastName, userName, email, password, extraFields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("📌 Received Data:", { firstName, lastName, userName, email, password, extraFields });
        if (!firstName || !lastName || !userName || !email || !password) {
            return { success: false, message: "All fields are required." };
        }
        yield (0, database_1.connectDB)();
        const existingUser = yield UserSchema_1.UserModel.findOne({ email });
        if (existingUser) {
            return { success: false, message: "Email already registered." };
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verifyCodeExpiry = new Date(Date.now() + 3600000);
        // Create new user
        const newUser = new UserSchema_1.UserModel(Object.assign({ firstName,
            lastName,
            userName,
            email, password: hashedPassword, isVerified: false }, extraFields));
        yield newUser.save();
        // Create verification entry linked to the user
        const userVerification = new UserVerificationSchema_1.UserVerificationModel({
            userId: newUser._id,
            verifyCode,
            verifyCodeExpiry,
        });
        yield userVerification.save();
        return { success: true, message: "User registered successfully!", verifyCode, userId: newUser._id };
    }
    catch (error) {
        console.error("❌ Error registering user:", error);
        return { success: false, message: "An error occurred.", error: error.message };
    }
});
exports.registerUser = registerUser;
const verifyUser = (userName, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        console.log("📌 Received Data:", { userName, code });
        if (!userName || !code) {
            console.error("❌ Missing required fields");
            return { success: false, message: "Username and code are required." };
        }
        const user = yield UserSchema_1.UserModel.findOne({ userName });
        if (!user) {
            console.error("❌ User not found");
            return { success: false, message: "User not found." };
        }
        const verification = yield UserVerificationSchema_1.UserVerificationModel.findOne({ userId: user._id });
        if (!verification) {
            return { success: false, message: "No verification record found." };
        }
        const isCodeValid = verification.verifyCode === code;
        const isCodeNotExpired = new Date(verification.verifyCodeExpiry) > new Date();
        if (isCodeValid && isCodeNotExpired) {
            yield user.save();
            console.log("✅ Account verified successfully:", userName);
            return { success: true, message: "Account verified successfully!" };
        }
        if (!isCodeNotExpired) {
            console.warn("⚠️ Verification code expired for:", userName);
            return { success: false, message: "Verification code expired. Please request a new code." };
        }
        console.warn("⚠️ Incorrect verification code for:", userName);
        return { success: false, message: "Incorrect verification code." };
    }
    catch (error) {
        console.error("❌ Error verifying user:", error);
        return { success: false, message: "Error verifying user.", error: error.message };
    }
});
exports.verifyUser = verifyUser;
const forgotPassword = (email, url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        console.log("📧 Forgot Password Request:", { email });
        const user = yield UserSchema_1.UserModel.findOne({ email });
        if (!user) {
            console.error("❌ User not found");
            return { success: false, message: "User not found." };
        }
        const resetToken = (0, uuid_1.v4)();
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1-hour expiry
        let verification = yield UserVerificationSchema_1.UserVerificationModel.findOne({ userId: user._id });
        if (verification) {
            verification.resetToken = resetToken;
            verification.resetTokenExpiry = resetTokenExpiry;
            yield verification.save();
        }
        else {
            verification = new UserVerificationSchema_1.UserVerificationModel({
                userId: user._id,
                resetToken,
                resetTokenExpiry,
            });
            yield verification.save();
        }
        const resetLink = `${url}/reset-password?token=${resetToken}`;
        console.log("✅ Password reset email sent:", resetLink);
        return { success: true, message: "Password reset email sent.", resetLink };
    }
    catch (error) {
        console.error("❌ Error in Forgot Password:", error);
        return { success: false, message: "Internal server error", error: error.message };
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        console.log("🔑 Reset Password Request:", { token });
        const verification = yield UserVerificationSchema_1.UserVerificationModel.findOne({ resetToken: token });
        if (!verification || new Date(verification.resetTokenExpiry) < new Date()) {
            console.error("❌ Invalid or expired reset token");
            return { success: false, message: "Invalid or expired reset token." };
        }
        const user = yield UserSchema_1.UserModel.findById(verification.userId);
        if (!user) {
            console.error("❌ User not found");
            return { success: false, message: "User not found." };
        }
        else {
            const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
            user.password = hashedPassword;
            yield user.save();
        }
        verification.resetToken = undefined;
        verification.resetTokenExpiry = undefined;
        yield verification.save();
        console.log("✅ Password reset successfully");
        return { success: true, message: "Password reset successfully." };
    }
    catch (error) {
        console.error("❌ Error resetting password:", error);
        return { success: false, message: "Error resetting password.", error: error.message };
    }
});
exports.resetPassword = resetPassword;
const updateUserFields = (userId, extraFields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🔄 Updating User Fields:", { userId, extraFields });
        const user = yield UserSchema_1.UserModel.findById(userId);
        if (!user) {
            return { success: false, message: "User not found." };
        }
        // ✅ Merge new fields into the existing user
        Object.assign(user, extraFields);
        yield user.save();
        console.log("✅ User updated successfully!");
        return { success: true, message: "User updated successfully!", user };
    }
    catch (error) {
        console.error("❌ Error updating user fields:", error);
        return { success: false, message: "An error occurred.", error: error.message };
    }
});
exports.updateUserFields = updateUserFields;
