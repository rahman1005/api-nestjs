import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateFileDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    extension: string;

    @IsNotEmpty()
    fileable_id: Types.ObjectId;

    @IsNotEmpty()
    fileable_type: string;

    @IsNotEmpty()
    folder: string;
}
