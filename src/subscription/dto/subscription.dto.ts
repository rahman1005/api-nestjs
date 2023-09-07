import { Types } from "mongoose";

export class CreateSubscriptionDto {
    _id: Types.ObjectId;
    picName: string;
    picPhone: string;
    picEmail: string;
    packageId: Types.ObjectId;
    startDate: Date;
    endDate: Date;
}

export class SendRequestSubscriptionDto {
    _id: Types.ObjectId;
    picName: string;
    picPhone: string;
    picEmail: string;
    packageId: Types.ObjectId;
    startDate: Date;
    endDate: Date;
}

export class ListSubscriptionDto {
    page: number;
    limit: number;
    search?: string;
}
