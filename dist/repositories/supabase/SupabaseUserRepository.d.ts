import { IUserRepository } from "../IUserRepository";
export declare class MongoUserRepository implements IUserRepository {
    updateUserFields(userId: string, extraFields: Record<string, any>): Promise<{
        success: boolean;
        message: string;
        user: any;
    }>;
    registerUser(firstName: string, lastName: string, userName: string, email: string, password: string, extraFields?: Record<string, any>): Promise<{
        success: boolean;
        message: string;
        userId?: any;
        verifyCode?: string;
    }>;
    verifyUser(userName: string, code: string): Promise<{
        success: boolean;
        message: string;
    }>;
    forgotPassword(email: string, url: string): Promise<{
        success: boolean;
        message: string;
        resetLink?: undefined;
    } | {
        success: boolean;
        message: string;
        resetLink: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
