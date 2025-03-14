import { Complaint } from "../models/classes/ComplainClass";
export interface BaseUser {
    userId: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    role: string;
    isVerified: Boolean;
    verificationId: string;
}
export interface UserVerificationInterface {
    isVerified: boolean;
    verifyCode?: string;
    verifyCodeExpiry?: Date;
    resetToken?: string;
    resetTokenExpiry?: Date;
}
export interface ConnectUser extends BaseUser {
    businessCards: string[];
    contacts: string[];
    plan: string;
    customerId?: string;
}
export interface EventFinderUser extends BaseUser {
    events: EVENT[];
    complaints: Complaint[];
    review?: string[];
}
export interface EVENT {
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
}
