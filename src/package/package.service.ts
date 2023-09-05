import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePackageDto, ListPackageDto } from './dto/package.dto';
import { Package } from './schemas/package.schema';

@Injectable()
export class PackageService {
    constructor(@InjectModel(Package.name) private packageModel: Model<Package>) { }

    async create(createPackagenDto: CreatePackageDto): Promise<Package> {
        const packageId = new Types.ObjectId();
        const body: Package = {
            _id: packageId,
            name: createPackagenDto.name,
            code: createPackagenDto.code,
            status: createPackagenDto.status,
            price: createPackagenDto.price
        }

        return await this.packageModel.create(body);
    }

    async all(query: ListPackageDto) {
        return await this.packageModel.find();
    }

    async findById(id: Types.ObjectId, fields: Array<keyof Package> = ['_id']): Promise<Package> {
        return await this.packageModel.findById(id).select(fields).lean();
    }

    async findByCode(code: string, fields: Array<keyof Package> = ['code']): Promise<Package> {
        return await this.packageModel.findOne({ code }).select(fields).lean();
    }
}
