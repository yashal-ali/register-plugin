import { UserModel } from "./models/schemas/UserSchema";
import { UserRepositoryFactory } from "./repositories/UserRepositoryFactory";
import { UserVerification } from "./models/classes/UserVerificationClass";
import { connectDB } from "./config/database";
export { UserRepositoryFactory } from "./repositories/UserRepositoryFactory";
export { connectDB } from "./config/database";
declare const _default: {
    UserRepositoryFactory: typeof UserRepositoryFactory;
    connectDB: typeof connectDB;
};
export default _default;
export { UserModel, UserVerification };
