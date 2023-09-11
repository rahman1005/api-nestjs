import { IsNotEmpty } from "class-validator";

export class FatSecretDto {
    @IsNotEmpty()
    key: string;

    @IsNotEmpty()
    page: number;
}