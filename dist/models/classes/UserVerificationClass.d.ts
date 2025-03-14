import { UserVerificationInterface } from "../../interface/UserInterface";
export declare class UserVerification {
    isVerified: boolean;
    verifyCode?: string;
    verifyCodeExpiry?: Date;
    resetToken?: string;
    resetTokenExpiry?: Date;
    constructor(data: UserVerificationInterface);
}
