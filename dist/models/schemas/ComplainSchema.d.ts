import mongoose from "mongoose";
import { Complaint } from "../classes/ComplainClass";
export declare const ComplaintModel: mongoose.Model<Complaint & mongoose.Document<unknown, any, any>, {}, {}, {}, mongoose.Document<unknown, {}, Complaint & mongoose.Document<unknown, any, any>> & Complaint & mongoose.Document<unknown, any, any> & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
