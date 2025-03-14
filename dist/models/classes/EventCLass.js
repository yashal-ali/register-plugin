"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    constructor(eventId, eventName, eventVenue, eventCity, eventCountry, eventOwnerId, verified, verifiedById, hostName, price, eventTypeId, description, rating, imageUri, eventLink, eventDate, complaints) {
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
exports.Event = Event;
