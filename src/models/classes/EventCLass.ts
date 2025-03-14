import { Complaint } from "./ComplainClass";

export class Event {
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

  constructor(
    eventId: string,
    eventName: string,
    eventVenue: string,
    eventCity: string,
    eventCountry: string,
    eventOwnerId: string,
    verified: boolean,
    verifiedById: string,
    hostName: string,
    price: number | string,
    eventTypeId: string,
    description: string,
    rating: number,
    imageUri: string,
    eventLink: string,
    eventDate: Date,
    complaints?: Complaint[]
  ) {
    this.eventId = eventId;
    this.eventName = eventName;
    this.eventVenue = eventVenue;
    this.eventCity = eventCity;
    this.eventCountry = eventCountry;
    this.eventOwnerId = eventOwnerId;
    this.verified = verified;
    this.verifiedById = verifiedById;
    this.hostName = hostName;
    this.price = price;
    this.eventTypeId = eventTypeId;
    this.description = description;
    this.rating = rating;
    this.imageUri = imageUri;
    this.eventLink = eventLink;
    this.eventDate = eventDate;
    this.complaints = complaints;
  }
}
