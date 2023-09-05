import { Types } from "mongoose";
import { SubscriptionStatus } from "../interfaces/subscription.interface";

export class CreateSubscriptionDto {
    _id: Types.ObjectId;
    picName: string;
    picPhone: string;
    picEmail: string;
    packageId: Types.ObjectId;
    price: number;
    status: SubscriptionStatus;
    apiKey: string;
    startDate: Date;
    endDate: Date;
}

export class ListSubscriptionDto {
    page: number;
    limit: number;
    search?: string;
}
