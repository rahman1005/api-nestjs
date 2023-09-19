import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { JwtPayloadInterface } from 'src/auth/interfaces/auth.interface';
import { Strings } from 'src/utils';
import { CreateTagDto } from './dto/tag.dto';
import { TagStatus } from './interfaces/tag.interface';
import { Tag } from './schemas/tag.schema';

@Injectable()
export class TagService {
    constructor(@InjectModel(Tag.name) private articleModel: Model<Tag>) { }

    async create(data: CreateTagDto, user: JwtPayloadInterface) {
        const articleId = new Types.ObjectId();
        const slug = Strings.generateSlug(data.title);
        const body: Tag = {
            _id: articleId,
            title: data.title,
            slug: slug,
            description: data.description,
            price: data.price,
            status: TagStatus.WAITING,
            createdBy: user._id
        }
        return await this.articleModel.create(body);
    }

    async createDraft(data: CreateTagDto, user: JwtPayloadInterface) {
        const articleId = new Types.ObjectId();
        const slug = Strings.generateSlug(data.title);
        const article = await this.findBySlug(slug);

        let body: Tag = {
            _id: articleId,
            title: data.title,
            slug: slug,
            description: data.description,
            price: data.price,
            status: TagStatus.DRAFT,
            createdBy: user._id
        }

        if (!article) {
            return await this.articleModel.create(body);
        } else {
            body._id = article._id;
            await this.articleModel.findByIdAndUpdate(body._id, {
                title: data.title,
                slug: slug,
                description: data.description,
                price: data.price,
                status: TagStatus.DRAFT,
                createdBy: articleId
            });
            return await this.findBySlug(slug);
        }
    }

    async findBySlug(slug: string, fields: Array<keyof Tag> = ['_id']): Promise<Tag> {
        return await this.articleModel.findOne({ slug }).select(fields).lean();
    }

    async findById(id: Types.ObjectId, fields: Array<keyof Tag> = ['_id']): Promise<Tag> {
        return await this.articleModel.findById(id).select(fields).lean();
    }
}
