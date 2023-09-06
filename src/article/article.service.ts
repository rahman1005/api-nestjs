import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Strings } from 'src/utils';
import { CreateArticleDto } from './dto/article.dto';
import { ArticleStatus } from './interfaces/article.interface';
import { Article } from './schemas/article.schema';

@Injectable()
export class ArticleService {
    constructor(@InjectModel(Article.name) private articleModel: Model<Article>) { }

    async create(createArticleDto: CreateArticleDto) {
        const articleId = new Types.ObjectId();
        const slug = Strings.generateSlug(createArticleDto.title);
        const body: Article = {
            _id: articleId,
            title: createArticleDto.title,
            slug: slug,
            description: createArticleDto.description,
            price: createArticleDto.price,
            status: ArticleStatus.WAITING,
        }
        return await this.articleModel.create(body);
    }

    async createDraft(createArticleDto: CreateArticleDto) {
        const articleId = new Types.ObjectId();
        const slug = Strings.generateSlug(createArticleDto.title);
        const article = await this.findBySlug(slug);

        let body: Article = {
            _id: articleId,
            title: createArticleDto.title,
            slug: slug,
            description: createArticleDto.description,
            price: createArticleDto.price,
            status: ArticleStatus.DRAFT,
        }

        if (!article) {
            return await this.articleModel.create(body);
        } else {
            body._id = article._id;
            await this.articleModel.findByIdAndUpdate(body._id, {
                title: createArticleDto.title,
                slug: slug,
                description: createArticleDto.description,
                price: createArticleDto.price,
                status: ArticleStatus.DRAFT,
            });
            return await this.findBySlug(slug);
        }
    }

    async findBySlug(slug: string, fields: Array<keyof Article> = ['_id']): Promise<Article> {
        return await this.articleModel.findOne({ slug }).select(fields).lean();
    }

    async findById(id: Types.ObjectId, fields: Array<keyof Article> = ['_id']): Promise<Article> {
        return await this.articleModel.findById(id).select(fields).lean();
    }
}
