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
exports.MongoUserRepository = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const UserSchema_1 = require("../../models/schemas/UserSchema");
const UserVerificationSchema_1 = require("../../models/schemas/UserVerificationSchema");
const database_1 = require("../../config/database");
class MongoUserRepository {
    updateUserFields(userId, extraFields) {
        throw new Error("Method not implemented.");
    }
    registerUser(firstName, lastName, userName, email, password, extraFields) {
        return __awaiter(this, void 0, void 0, function* () {
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
                return {
                    success: true,
                    message: "User registered successfully!",
                    userId: userVerification.userId,
                    verifyCode
                };
            }
            catch (error) {
                console.error("❌ Error registering user:", error);
                return { success: false, message: "An error occurred." };
            }
        });
    }
    verifyUser(userName, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserSchema_1.UserModel.findOne({ userName });
            if (!user)
                return { success: false, message: "User not found." };
            const verification = yield UserVerificationSchema_1.UserVerificationModel.findOne({ userId: user._id });
            if (!verification || verification.verifyCode !== code || new Date(verification.verifyCodeExpiry) < new Date()) {
                return { success: false, message: "Invalid or expired verification code." };
            }
            user.isVerified = true;
            yield user.save();
            return { success: true, message: "Account verified!" };
        });
    }
    forgotPassword(email, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserSchema_1.UserModel.findOne({ email });
            if (!user)
                return { success: false, message: "User not found." };
            const resetToken = (0, uuid_1.v4)();
            const resetTokenExpiry = new Date(Date.now() + 3600000);
            let verification = yield UserVerificationSchema_1.UserVerificationModel.findOne({ userId: user._id });
            if (verification) {
                verification.resetToken = resetToken;
                verification.resetTokenExpiry = resetTokenExpiry;
                yield verification.save();
            }
            else {
                verification = new UserVerificationSchema_1.UserVerificationModel({ userId: user._id, resetToken, resetTokenExpiry });
                yield verification.save();
            }
            const resetLink = `${url}/reset-password?token=${resetToken}`;
            return { success: true, message: "Password reset link sent.", resetLink };
        });
    }
    resetPassword(token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const verification = yield UserVerificationSchema_1.UserVerificationModel.findOne({ resetToken: token });
            if (!verification) {
                return { success: false, message: "Invalid or expired reset token." };
            }
            const user = yield UserSchema_1.UserModel.findById(verification.userId);
            if (!user)
                return { success: false, message: "User not found." };
            user.password = yield bcryptjs_1.default.hash(newPassword, 10);
            yield user.save();
            verification.resetToken = undefined;
            verification.resetTokenExpiry = undefined;
            yield verification.save();
            return { success: true, message: "Password reset successfully." };
        });
    }
}
exports.MongoUserRepository = MongoUserRepository;
