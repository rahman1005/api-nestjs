import { Types } from "mongoose";

export interface JwtPayloadInterface {
    _id: Types.ObjectId;
    email: string;
    phone: string;
}