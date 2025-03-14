"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVerificationMapper = void 0;
class UserVerificationMapper {
    constructor(data) {
        this.isVerified = data.isVerified;
        this.verifyCode = data.verifyCode;
        this.verifyCodeExpiry = data.verifyCodeExpiry;
        this.resetToken = data.resetToken;
        this.resetTokenExpiry = data.resetTokenExpiry;
    }
    toORM() {
        return Object.assign({}, this);
    }
    static fromORM(data) {
        return new UserVerificationMapper(data);
    }
}
exports.UserVerificationMapper = UserVerificationMapper;
