import { UserVerificationInterface } from "../../interface/UserInterface";
export declare class UserVerificationMapper {
    isVerified: boolean;
    verifyCode?: string;
    verifyCodeExpiry?: Date;
    resetToken?: string;
    resetTokenExpiry?: Date;
    constructor(data: UserVerificationInterface);
    toORM(): this;
    static fromORM(data: any): UserVerificationMapper;
}
