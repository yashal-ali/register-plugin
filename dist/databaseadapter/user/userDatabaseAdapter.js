"use strict";
// import mongoose, { Model } from "mongoose";
// import { createClient } from '@supabase/supabase-js'
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseAdapter = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DATA_STORE = process.env.DATA_STORE || "MONGO";
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_KEY);
class DatabaseAdapter {
    static findOne(model, query) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (DATA_STORE) {
                case "MONGO":
                    if (typeof model !== "string")
                        return model.findOne({ query });
                case "SUPABASE":
                    const { data, error } = yield supabase.from(model).select("*").match(query).single();
                    if (error) {
                        console.error("❌ Supabase Query Error:", error);
                        return null;
                    }
                    return data;
                default:
                    throw new Error(`❌ Invalid DATA_STORE: ${DATA_STORE}`);
            }
        });
    }
    static create(model, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (DATA_STORE) {
                case "MONGO":
                    if (typeof model !== "string")
                        return new model(payload).save(); // For MongoDB
                    throw new Error("❌ MongoDB requires a model instance.");
                case "SUPABASE":
                    const { data, error } = yield supabase.from(model).insert([payload]);
                    if (error) {
                        console.error("❌ Supabase Insert Error:", error);
                        return null;
                    }
                    return data;
                default:
                    throw new Error(`❌ Invalid DATA_STORE: ${DATA_STORE}`);
            }
        });
    }
    static update(model, query, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (DATA_STORE) {
                case "MONGO":
                    if (typeof model !== "string")
                        return model.findOneAndUpdate(query, updateData, { new: true }); // For MongoDB
                    throw new Error("❌ MongoDB requires a model instance.");
                case "SUPABASE":
                    const { data, error } = yield supabase.from(model).update(updateData).match(query);
                    if (error) {
                        console.error("❌ Supabase Update Error:", error);
                        return null;
                    }
                    return data;
                default:
                    throw new Error(`❌ Invalid DATA_STORE: ${DATA_STORE}`);
            }
        });
    }
    static delete(model, query) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (DATA_STORE) {
                case "MONGO":
                    if (typeof model !== "string")
                        return model.findOneAndDelete(query); // For MongoDB
                    throw new Error("❌ MongoDB requires a model instance.");
                case "SUPABASE":
                    const { error } = yield supabase.from(model).delete().match(query);
                    if (error) {
                        console.error("❌ Supabase Delete Error:", error);
                        return false;
                    }
                    return true;
                default:
                    throw new Error(`❌ Invalid DATA_STORE: ${DATA_STORE}`);
            }
        });
    }
}
exports.DatabaseAdapter = DatabaseAdapter;
