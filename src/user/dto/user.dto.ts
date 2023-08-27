import { Nullable } from "src/global";

export class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    isVerified?: Nullable<Date>;
    age?: number;
}
