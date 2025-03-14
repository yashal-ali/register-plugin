import { BaseUser } from "../../interface/UserInterface";

export class User {
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: string;
  isVerified: Boolean;
  verificationId: string
  
  constructor(data: BaseUser) {
    this.userId = data.userId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.userName = data.userName;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.verificationId=data.verificationId;
    this.isVerified=data.isVerified
  }
}
