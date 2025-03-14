import { Model } from "mongoose";
export declare class DatabaseAdapter {
    static findOne(model: Model<any> | string, query: object): Promise<any>;
    static create(model: Model<any> | string, payload: any): Promise<any>;
    static update(model: Model<any> | string, query: object, updateData: object): Promise<any>;
    static delete(model: Model<any> | string, query: object): Promise<any>;
}
