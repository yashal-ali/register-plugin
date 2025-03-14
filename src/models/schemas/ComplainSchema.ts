import mongoose, { Schema, Document } from "mongoose";
import { Complaint } from "../classes/ComplainClass";

// Mongoose Schema for MongoDB
const ComplaintSchema = new Schema <Complaint & Document>({
  complaintId: { type: String, required: true, unique: true },
  referenceId: { type: String, required: true },
  userId: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "open" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const ComplaintModel = mongoose.model<Complaint & Document>("Complaint", ComplaintSchema);
