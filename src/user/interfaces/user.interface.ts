import { User } from "../schemas/user.schema";

export enum SexUser {
    MALE = 1,
    FEMALE = 2,
}

export enum BloodUser {
    A = 'A',
    B = 'B',
    AB = 'AB',
    O = '0'
}


export interface UpdateUser {
    isVerified?: Date;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    age?: number;
}

export interface CreateUserInterface {
    user: User;
    hash: string;
}