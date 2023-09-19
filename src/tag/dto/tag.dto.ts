import { Types } from "mongoose";
import { TagStatus } from "../interfaces/tag.interface";

export class CreateTagDto {
    _id: Types.ObjectId;
    slug: string;
    title: string;
    description?: string;
    type: string;
    price?: number;
    status?: TagStatus;
}

export class ListTagDto {
    page: number;
    limit: number;
    search?: string;
}
