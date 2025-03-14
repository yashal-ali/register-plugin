"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryFactory = void 0;
const useMongoAuthRepo_1 = require("../repositories/mongo/useMongoAuthRepo");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserRepositoryFactory {
    static createRepository() {
        const DB_TYPE = process.env.DB_TYPE || "mongo";
        if (DB_TYPE === "mongo") {
            return new useMongoAuthRepo_1.MongoUserRepository();
        }
        throw new Error("Invalid DB_TYPE in environment variables");
    }
}
exports.UserRepositoryFactory = UserRepositoryFactory;
