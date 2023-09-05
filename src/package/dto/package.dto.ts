export class CreatePackageDto {
    name: string;
    code: string;
    price: number;
    status: boolean;
}

export class ListPackageDto {
    page: number;
    limit: number;
    search?: string;
}
