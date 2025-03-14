"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(data) {
        this.userId = data.userId;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.userName = data.userName;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role;
        this.verificationId = data.verificationId;
        this.isVerified = data.isVerified;
    }
}
exports.User = User;
