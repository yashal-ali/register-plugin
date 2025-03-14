// import mongoose, { Model } from "mongoose";
// import { createClient } from '@supabase/supabase-js'

// const DATA_STORE = process.env.DATA_STORE || "MONGO"; // Default to MongoDB
// const SUPABASE_URL ="https://ahddqxemrkoecdwlptgj.supabase.co"
// const SUPABASE_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZGRxeGVtcmtvZWNkd2xwdGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NzYyNzAsImV4cCI6MjA1NzQ1MjI3MH0.oGszRtJOeuv00B8JG2GPcnBILMJj2Pc1IIECCLe844g"
// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// export class DatabaseAdapter {
  
//   static async findOne(model: Model<any>, query: object) {
//     switch (DATA_STORE) {
//       case "MONGO":
//         return model.findOne(query);

//       case "SUPABASE":
//         const { data, error } = await supabase.from(model.collection.name).select("*").match(query).single();
//         if (error) {
//           console.error("❌ Supabase Query Error:", error);
//           return null;
//         }
//         return data;

//       default:
//         throw new Error(`❌ Invalid DATA_STORE: ${DATA_STORE}`);
//     }
//   }

//   static async create(model: Model<any>, payload: any) {
//     switch (DATA_STORE) {
//       case "MONGO":
//         return new model(payload).save();

//       case "SUPABASE":
//         const { data, error } = await supabase.from(model.collection.name).insert([payload]);
//         if (error) {
//           console.error("❌ Supabase Insert Error:", error);
//           return null;
//         }
//         return data;

//       default:
//         throw new Error(`❌ Invalid DATA_STORE: ${DATA_STORE}`);
//     }
//   }

//   static async update(model: Model<any>, query: object, updateData: object) {
//     switch (DATA_STORE) {
//       case "MONGO":
//         return model.findOneAndUpdate(query, updateData, { new: true });

//       case "SUPABASE":
//         const { data, error } = await supabase.from(model.collection.name).update(updateData).match(query);
//         if (error) {
//           console.error("❌ Supabase Update Error:", error);
//           return null;
//         }
//         return data;

//       default:
//         throw new Error(`❌ Invalid DATA_STORE: ${DATA_STORE}`);
//     }
//   }

//   static async delete(model: Model<any>, query: object) {
//     switch (DATA_STORE) {
//       case "MONGO":
//         return model.findOneAndDelete(query);

//       case "SUPABASE":
//         const { error } = await supabase.from(model.collection.name).delete().match(query);
//         if (error) {
//           console.error("❌ Supabase Delete Error:", error);
//           return false;
//         }
//         return true;

//       default:
//         throw new Error(`❌ Invalid DATA_STORE: ${DATA_STORE}`);
//     }
//   }
// }

import mongoose, { Model } from "mongoose";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const DATA_STORE = process.env.DATA_STORE || "MONGO";
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export class DatabaseAdapter {
  static async findOne(model: Model<any> | string, query: object) {
    switch (DATA_STORE) {
      case "MONGO":
        if (typeof model !== "string") 
           return model.findOne({query});
          
      case "SUPABASE":
        const { data, error } = await supabase.from(model as string).select("*").match(query).single();
        if (error) {
          console.error("❌ Supabase Query Error:", error);
          return null;
        }
        return data;

      default:
        throw new Error(`❌ Invalid DATA_STORE: ${DATA_STORE}`);
    }
  }

  static async create(model: Model<any> | string, payload: any) {
    switch (DATA_STORE) {
      case "MONGO":
        if (typeof model !== "string") return new model(payload).save(); // For MongoDB
        throw new Error("❌ MongoDB requires a model instance.");

      case "SUPABASE":
        const { data, error } = await supabase.from(model as string).insert([payload]);
        if (error) {
          console.error("❌ Supabase Insert Error:", error);
          return null;
        }
        return data;

      default:
        throw new Error(`❌ Invalid DATA_STORE: ${DATA_STORE}`);
    }
  }

  static async update(model: Model<any> | string, query: object, updateData: object) {
    switch (DATA_STORE) {
      case "MONGO":
        if (typeof model !== "string") return model.findOneAndUpdate(query, updateData, { new: true }); // For MongoDB
        throw new Error("❌ MongoDB requires a model instance.");

      case "SUPABASE":
        const { data, error } = await supabase.from(model as string).update(updateData).match(query);
        if (error) {
          console.error("❌ Supabase Update Error:", error);
          return null;
        }
        return data;

      default:
        throw new Error(`❌ Invalid DATA_STORE: ${DATA_STORE}`);
    }
  }

  static async delete(model: Model<any> | string, query: object) {
    switch (DATA_STORE) {
      case "MONGO":
        if (typeof model !== "string") return model.findOneAndDelete(query); // For MongoDB
        throw new Error("❌ MongoDB requires a model instance.");

      case "SUPABASE":
        const { error } = await supabase.from(model as string).delete().match(query);
        if (error) {
          console.error("❌ Supabase Delete Error:", error);
          return false;
        }
        return true;

      default:
        throw new Error(`❌ Invalid DATA_STORE: ${DATA_STORE}`);
    }
  }
}
