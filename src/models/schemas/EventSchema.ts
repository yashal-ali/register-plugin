import mongoose, { Schema, Document } from "mongoose";
import { ComplaintModel } from "./ComplainSchema"
import {Event} from "./../classes/EventCLass"

// Mongoose Schema for MongoDB
const EventSchema = new Schema <Event & Document>({
  eventId: { type: String, required: true, unique: true },
  eventName: { type: String, required: true },
  eventVenue: { type: String, required: true },
  eventCity: { type: String, required: true },
  eventCountry: { type: String, required: true },
  eventOwnerId: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verifiedById: { type: String },
  hostName: { type: String, required: true },
  price: { type: mongoose.Schema.Types.Mixed, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0 },
  imageUri: { type: String, required: true },
  eventLink: { type: String, required: true },
  eventDate: { type: Date, required: true },
  complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: "Complaint" }],
});

export const EventModel = mongoose.model<Event & Document>("Event", EventSchema);
