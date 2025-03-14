import { UserModel } from "./models/schemas/UserSchema";
import { UserRepositoryFactory } from "./repositories/UserRepositoryFactory";
import { UserVerification } from "./models/classes/UserVerificationClass";
export { UserRepositoryFactory } from "./repositories/UserRepositoryFactory";
declare const _default: {
    UserRepositoryFactory: typeof UserRepositoryFactory;
};
export default _default;
export { UserModel, UserVerification };
