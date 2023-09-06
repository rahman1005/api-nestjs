import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCorporateDto } from './dto/corporate.dto';
import { ListCorporateDto, StatusCorporate } from './interfaces/corporate.interface';
import { Corporate } from './schemas/corporate.schema';

@Injectable()
export class CorporateService {
    constructor(@InjectModel(Corporate.name) private appointmentModel: Model<Corporate>) { }

    async create(createCorporateDto: CreateCorporateDto): Promise<Corporate> {
        const appointmentId = new Types.ObjectId();
        const provider = "";
        if (!provider) {
            throw new Error('provider not found');
        }
        const body: Corporate = {
            _id: appointmentId,
            name: createCorporateDto.name,
            status: StatusCorporate.PENDING,
            picEmail: createCorporateDto.picEmail,
            picName: createCorporateDto.picName,
            picPhone: createCorporateDto.picPhone,
        }
        const createdCorporate = new this.appointmentModel(body);
        await createdCorporate.save();
        return await this.findById(createdCorporate._id, ['_id']);
    }

    async all(query: ListCorporateDto) {
        return await this.appointmentModel.find();
    }

    async findById(id: Types.ObjectId, fields: Array<keyof Corporate> = ['_id']): Promise<Corporate> {
        return await this.appointmentModel.findById(id).select(fields).lean();
    }
}
