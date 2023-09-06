
export enum StatusCorporate {
    PENDING = 1,
    PAID = 2,
    APPROVED_BY_PARTNER = 3,
    REJECTED_BY_PARTNER = 4,
    CHANGED_BY_PARTNER = 5,
    APPROVED_BY_USER = 6,
    REJECTED_BY_USER = 7,
    CONSULTING = 7,
    ACTIVE = 8
}

export class ListCorporateDto {
    page: number;
    limit: number;
    search?: string;
}