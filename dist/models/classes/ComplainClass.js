"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Complaint = void 0;
class Complaint {
    constructor(complaintId, referenceId, userId, description, status) {
        this.complaintId = complaintId;
        this.referenceId = referenceId;
        this.userId = userId;
        this.description = description;
        this.status = status;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
exports.Complaint = Complaint;
