import { SupabaseClient } from "@supabase/supabase-js";
declare let supabase: SupabaseClient | null;
export declare function connectDB(): Promise<void>;
export { supabase };
