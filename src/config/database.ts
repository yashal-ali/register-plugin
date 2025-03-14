

import mongoose from "mongoose";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

import dotenv from "dotenv";
dotenv.config();


const MONGO_URI = process.env.MONGODB_URI as string;
const DATA_STORE = process.env.DATA_STORE || "MONGO";

let supabase: SupabaseClient | null = null;

export async function connectDB() {

  if (DATA_STORE === "MONGO") {
    try {
      await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 50000,
      });
      console.log("✅ MongoDB Connected Successfully (scient-auth).");
    } catch (error) {
      console.error("❌ MongoDB Connection Failed (scient-auth):", error);
      throw new Error("MongoDB Connection Failed");
    }
  } else if (DATA_STORE === "SUPABASE") {
    const SUPABASE_URL ="https://ahddqxemrkoecdwlptgj.supabase.co"
    const SUPABASE_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZGRxeGVtcmtvZWNkd2xwdGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NzYyNzAsImV4cCI6MjA1NzQ1MjI3MH0.oGszRtJOeuv00B8JG2GPcnBILMJj2Pc1IIECCLe844g"
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }
}

export { supabase };
