import { Types } from "mongoose";
import { StatusCorporate } from "../interfaces/corporate.interface";

export class CreateCorporateDto {
    _id: Types.ObjectId;
    corporateId?: Types.ObjectId;
    name: string;
    picName: string;
    picPhone: string;
    picEmail: string;
    status: StatusCorporate;
}
