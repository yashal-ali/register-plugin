import { BaseUser } from "../../interface/UserInterface";
export declare class User {
    userId: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    role: string;
    isVerified: Boolean;
    verificationId: string;
    constructor(data: BaseUser);
}
