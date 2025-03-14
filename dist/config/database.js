"use strict";
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
exports.supabase = void 0;
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGODB_URI;
const DATA_STORE = process.env.DATA_STORE || "MONGO";
let supabase = null;
exports.supabase = supabase;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (DATA_STORE === "MONGO") {
            try {
                yield mongoose_1.default.connect(MONGO_URI, {
                    serverSelectionTimeoutMS: 50000,
                });
                console.log("✅ MongoDB Connected Successfully (scient-auth).");
            }
            catch (error) {
                console.error("❌ MongoDB Connection Failed (scient-auth):", error);
                throw new Error("MongoDB Connection Failed");
            }
        }
        else if (DATA_STORE === "SUPABASE") {
            const SUPABASE_URL = "https://ahddqxemrkoecdwlptgj.supabase.co";
            const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZGRxeGVtcmtvZWNkd2xwdGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NzYyNzAsImV4cCI6MjA1NzQ1MjI3MH0.oGszRtJOeuv00B8JG2GPcnBILMJj2Pc1IIECCLe844g";
            exports.supabase = supabase = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_KEY);
        }
    });
}
