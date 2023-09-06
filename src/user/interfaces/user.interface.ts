export interface UpdateUser {
    otp?: string;
    isVerified?: Date;
}

export enum Sex {
    MALE = 1,
    FEMALE = 2,
}

export enum Blood {
    A = 'A',
    B = 'B',
    AB = 'AB',
    O = '0'
}