import { Types } from "mongoose";
import { ArticleStatus } from "../interfaces/article.interface";

export class CreateArticleDto {
    _id: Types.ObjectId;
    slug: string;
    title: string;
    description: string;
    tags?: [Types.ObjectId];
    price?: number;
    status?: ArticleStatus;
}

export class ListArticleDto {
    page: number;
    limit: number;
    search?: string;
}
