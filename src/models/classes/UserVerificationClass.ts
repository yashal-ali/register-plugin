import { UserVerificationInterface } from "../../interface/UserInterface";

export class UserVerification {
  isVerified: boolean;
  verifyCode?: string;
  verifyCodeExpiry?: Date;
  resetToken?: string;
  resetTokenExpiry?: Date;

  constructor(data: UserVerificationInterface) {
    this.isVerified = data.isVerified || false;
    this.verifyCode = data.verifyCode;
    this.verifyCodeExpiry = data.verifyCodeExpiry;
    this.resetToken = data.resetToken;
    this.resetTokenExpiry = data.resetTokenExpiry;
  }
}
