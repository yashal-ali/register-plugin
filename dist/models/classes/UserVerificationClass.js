"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVerification = void 0;
class UserVerification {
    constructor(data) {
        this.isVerified = data.isVerified || false;
        this.verifyCode = data.verifyCode;
        this.verifyCodeExpiry = data.verifyCodeExpiry;
        this.resetToken = data.resetToken;
        this.resetTokenExpiry = data.resetTokenExpiry;
    }
}
exports.UserVerification = UserVerification;
