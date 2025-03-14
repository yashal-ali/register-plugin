export declare class Complaint {
    complaintId: string;
    referenceId: string;
    userId: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(complaintId: string, referenceId: string, userId: string, description: string, status: string);
}
