import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateFileDto } from './dto/file.dto';
import { File } from './schemas/file.schema';

@Injectable()
export class FileService {
    constructor(@InjectModel(File.name) private fileModel: Model<File>) { }

    async create(createFileDto: CreateFileDto): Promise<File> {
        const fileId = new Types.ObjectId();
        const body: File = {
            _id: fileId,
            name: createFileDto.name,
            extension: createFileDto.extension,
            folder: createFileDto.folder,
            fileable_id: createFileDto.fileable_id,
            fileable_type: createFileDto.fileable_type
        }
        return await this.fileModel.create(body);
    }
}