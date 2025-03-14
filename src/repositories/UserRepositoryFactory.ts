import { IUserRepository } from "./IUserRepository";
import { MongoUserRepository } from "../repositories/mongo/useMongoAuthRepo";

import dotenv from "dotenv";

dotenv.config();

export class UserRepositoryFactory {
  static createRepository(): IUserRepository {
    const DB_TYPE = process.env.DB_TYPE || "mongo";
    if (DB_TYPE === "mongo") {
      return new MongoUserRepository();
    }
    throw new Error("Invalid DB_TYPE in environment variables");
  }
}
