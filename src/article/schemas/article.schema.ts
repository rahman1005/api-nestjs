
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ArticleStatus } from '../interfaces/article.interface';

@Schema({ timestamps: true })
export class Article {
    @Prop({ required: true })
    _id: Types.ObjectId;

    @Prop({ required: true })
    slug: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: false })
    tags?: [Types.ObjectId];

    @Prop({ required: false })
    price?: number;

    @Prop({ required: true })
    status: ArticleStatus;

    @Prop({ required: true })
    createdBy: Types.ObjectId;
}

export type ArticleDocument = HydratedDocument<Article>;
export const ArticleSchema = SchemaFactory.createForClass(Article);
