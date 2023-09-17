
import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

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

    @IsNotEmpty()
    hash: string;
}

export class ResetPasswordDto {
    @IsNotEmpty()
    hash: string;

    @IsNotEmpty()
    @MinLength(8)
    newPassword: string;

    @IsNotEmpty()
    @MinLength(8)
    newPasswordConfirm: string;
}
