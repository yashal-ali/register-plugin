"use strict";
// import {  registerUser, verifyUser, resetPassword, forgotPassword } from "./services/authService/authService";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVerification = exports.UserModel = exports.connectDB = exports.UserRepositoryFactory = void 0;
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
const UserVerificationClass_1 = require("./models/classes/UserVerificationClass");
Object.defineProperty(exports, "UserVerification", { enumerable: true, get: function () { return UserVerificationClass_1.UserVerification; } });
const database_1 = require("./config/database");
var UserRepositoryFactory_2 = require("./repositories/UserRepositoryFactory");
Object.defineProperty(exports, "UserRepositoryFactory", { enumerable: true, get: function () { return UserRepositoryFactory_2.UserRepositoryFactory; } });
var database_2 = require("./config/database");
Object.defineProperty(exports, "connectDB", { enumerable: true, get: function () { return database_2.connectDB; } });
exports.default = { UserRepositoryFactory: UserRepositoryFactory_1.UserRepositoryFactory, connectDB: database_1.connectDB };
