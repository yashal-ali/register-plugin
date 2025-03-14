import { BaseUser } from "../../interface/UserInterface";
export declare class UserMapper {
    userId: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    role: string;
    constructor(data: BaseUser);
    toORM(): this;
    static fromORM(data: any): UserMapper;
}
