import { Complaint } from "./ComplainClass";
export declare class Event {
    eventId: string;
    eventName: string;
    eventVenue: string;
    eventAddress?: string;
    eventCity: string;
    eventCountry: string;
    eventOwnerId: string;
    verified: boolean;
    verifiedById: string;
    hostName: string;
    price: number | string;
    eventTypeId: string;
    description: string;
    rating: number;
    imageUri: string;
    eventLink: string;
    eventDate: Date;
    complaints?: Complaint[];
    constructor(eventId: string, eventName: string, eventVenue: string, eventCity: string, eventCountry: string, eventOwnerId: string, verified: boolean, verifiedById: string, hostName: string, price: number | string, eventTypeId: string, description: string, rating: number, imageUri: string, eventLink: string, eventDate: Date, complaints?: Complaint[]);
}
