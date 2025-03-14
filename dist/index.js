"use strict";
// import {  registerUser, verifyUser, resetPassword, forgotPassword } from "./services/authService/authService";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVerification = exports.UserModel = exports.UserRepositoryFactory = void 0;
// import { UserModel } from "../src/models/schemas/UserSchema";
// import { UserVerificationModel } from "./models/schemas/UserVerificationSchema";
// import mongoose from "mongoose";
// const registerNewUser = async () => {
//   const userData = {
//      userId: new mongoose.Types.ObjectId().toHexString(),
//     firstName: "John",
//     lastName: "Doe",
//     userName: "johndoe12345",
//     email: "johndoe12@gmail.com",
//     password: "SecurePass123",
//     role:"user"
//   };
//   const result = await registerUser(UserModel, UserVerificationModel, userData);
//   console.log(result); // Log the result
// };
// registerNewUser();
// const verifyExistingUser = async (email: string, code: string) => {
//   const result = await verifyUser(UserModel, UserVerificationModel,email, code);
//   console.log(result);
// };
// const forgotUserPassword = async (email: string, url: string) => {
//   const result = await forgotPassword(UserModel,email, url);
//   console.log(result);
// };
// const resetUserPassword = async (token: string, newPassword: string) => {
//   const result = await resetPassword(UserModel,token, newPassword);
//   console.log(result);
// };
// // Call Functions
// // registerNewUser();
// verifyExistingUser("johndoe12345", "292084");
// // forgotUserPassword("johndoe@gmail.com", "http://localhost:3000");
// // resetUserPassword("sample-reset-token", "UpdatedPass789");
// export { registerUser, verifyUser, resetPassword, forgotPassword } from "./services/authService/authService";
// export default { registerUser, verifyUser, resetPassword, forgotPassword}
const UserSchema_1 = require("./models/schemas/UserSchema");
Object.defineProperty(exports, "UserModel", { enumerable: true, get: function () { return UserSchema_1.UserModel; } });
const UserRepositoryFactory_1 = require("./repositories/UserRepositoryFactory");
Object.defineProperty(exports, "UserRepositoryFactory", { enumerable: true, get: function () { return UserRepositoryFactory_1.UserRepositoryFactory; } });
const UserVerificationClass_1 = require("./models/classes/UserVerificationClass");
Object.defineProperty(exports, "UserVerification", { enumerable: true, get: function () { return UserVerificationClass_1.UserVerification; } });
const userRepository = UserRepositoryFactory_1.UserRepositoryFactory.createRepository();
// 🔹 Test Register User
function testRegisterUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield userRepository.registerUser("John", "Doe", "deman", "stefan@example.com", "securePassword123", { age: 25, country: "USA" } // extra fields (optional)
        );
        console.log("✅ Register User Result:", result);
    });
}
// 🔹 Test Verify User
function testVerifyUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield userRepository.verifyUser("deman", "123456");
        console.log("✅ Verify User Result:", result);
    });
}
// 🔹 Test Forgot Password
function testForgotPassword() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield userRepository.forgotPassword("stefan@example.com", "https://example.com");
        console.log("✅ Forgot Password Result:", result);
    });
}
// 🔹 Test Reset Password
function testResetPassword() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield userRepository.resetPassword("sample-reset-token", "newPassword123");
        console.log("✅ Reset Password Result:", result);
    });
}
// Run tests
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testRegisterUser();
    yield testVerifyUser();
    yield testForgotPassword();
    yield testResetPassword();
}))();
