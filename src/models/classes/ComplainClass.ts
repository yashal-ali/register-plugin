export class Complaint {
    complaintId: string;
    referenceId: string;
    userId: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(complaintId: string, referenceId: string, userId: string, description: string, status: string) {
      this.complaintId = complaintId;
      this.referenceId = referenceId;
      this.userId = userId;
      this.description = description;
      this.status = status;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
  