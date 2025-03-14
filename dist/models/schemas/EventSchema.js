"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Mongoose Schema for MongoDB
const EventSchema = new mongoose_1.Schema({
    eventId: { type: String, required: true, unique: true },
    eventName: { type: String, required: true },
    eventVenue: { type: String, required: true },
    eventCity: { type: String, required: true },
    eventCountry: { type: String, required: true },
    eventOwnerId: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verifiedById: { type: String },
    hostName: { type: String, required: true },
    price: { type: mongoose_1.default.Schema.Types.Mixed, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0 },
    imageUri: { type: String, required: true },
    eventLink: { type: String, required: true },
    eventDate: { type: Date, required: true },
    complaints: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Complaint" }],
});
exports.EventModel = mongoose_1.default.model("Event", EventSchema);
