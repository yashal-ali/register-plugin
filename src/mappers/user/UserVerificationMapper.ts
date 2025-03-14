import { UserVerificationInterface } from "../../interface/UserInterface";

export class UserVerificationMapper {
    isVerified: boolean;
    verifyCode?: string;
    verifyCodeExpiry?: Date;
    resetToken?: string;
    resetTokenExpiry?: Date;
  
    constructor(data: UserVerificationInterface) {
      this.isVerified = data.isVerified;
      this.verifyCode = data.verifyCode;
      this.verifyCodeExpiry = data.verifyCodeExpiry;
      this.resetToken = data.resetToken;
      this.resetTokenExpiry = data.resetTokenExpiry;
    }
  
    toORM() {
      return { ...this };
    }
  
    static fromORM(data: any): UserVerificationMapper {
      return new UserVerificationMapper(data);
    }
  }
  