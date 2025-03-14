// import {  registerUser, verifyUser, resetPassword, forgotPassword } from "./services/authService/authService";

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

import { UserModel } from "./models/schemas/UserSchema";
import { UserRepositoryFactory } from "./repositories/UserRepositoryFactory";
import { UserVerification } from "./models/classes/UserVerificationClass";
import { connectDB } from "./config/database";

export {
  UserRepositoryFactory
} from "./repositories/UserRepositoryFactory"

export {
  connectDB
} from "./config/database"
export default { UserRepositoryFactory ,connectDB}
// const userRepository = UserRepositoryFactory.createRepository();

// // 🔹 Test Register User
// async function testRegisterUser() {
//   const result = await userRepository.registerUser(
//     "John",
//     "Doe",
//     "deman",
//     "stefan@example.com",
//     "securePassword123",
//     { age: 25, country: "USA" } // extra fields (optional)
//   );
//   console.log("✅ Register User Result:", result);
// }

// // 🔹 Test Verify User
// async function testVerifyUser() {
//   const result = await userRepository.verifyUser("deman", "123456");
//   console.log("✅ Verify User Result:", result);
// }

// // 🔹 Test Forgot Password
// async function testForgotPassword() {
//   const result = await userRepository.forgotPassword("stefan@example.com", "https://example.com");
//   console.log("✅ Forgot Password Result:", result);
// }

// // 🔹 Test Reset Password
// async function testResetPassword() {
//   const result = await userRepository.resetPassword("sample-reset-token", "newPassword123");
//   console.log("✅ Reset Password Result:", result);
// }

// // Run tests
// (async () => {
//   await testRegisterUser();
//   await testVerifyUser();
//   await testForgotPassword();
//   await testResetPassword();
// })();

export {

  UserModel,
  UserVerification
  
}