import mongoose from "mongoose";
import { Event } from "./../classes/EventCLass";
export declare const EventModel: mongoose.Model<Event & mongoose.Document<unknown, any, any>, {}, {}, {}, mongoose.Document<unknown, {}, Event & mongoose.Document<unknown, any, any>> & Event & mongoose.Document<unknown, any, any> & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
