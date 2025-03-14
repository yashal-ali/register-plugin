"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
class UserMapper {
    constructor(data) {
        this.userId = data.userId;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.userName = data.userName;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role;
    }
    toORM() {
        return Object.assign({}, this);
    }
    static fromORM(data) {
        return new UserMapper(data);
    }
}
exports.UserMapper = UserMapper;
