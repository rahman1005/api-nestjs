
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class RegisterAuthDto {
    @IsNotEmpty()
    firstName: string;

    lastName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
    password: string;
}

export class LoginAuthDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class RequestVerificationAccountDto {
    @IsEmail()
    email: string;
}

export class VerificationAccountDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    otp: string;
}
