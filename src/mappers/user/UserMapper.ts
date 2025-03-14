import { BaseUser } from "../../interface/UserInterface";

export class UserMapper {
    userId: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    role: string;
  
    constructor(data: BaseUser) {
      this.userId = data.userId;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.userName = data.userName;
      this.email = data.email;
      this.password = data.password;
      this.role = data.role;
    }
  
    toORM() {
      return { ...this };
    }
  
    static fromORM(data: any): UserMapper {
      return new UserMapper(data);
    }
  }
  