
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TagStatus } from '../interfaces/tag.interface';

@Schema({ timestamps: true })
export class Tag {
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
    status: TagStatus;

    @Prop({ required: true })
    createdBy: Types.ObjectId;
}

export type TagDocument = HydratedDocument<Tag>;
export const TagSchema = SchemaFactory.createForClass(Tag);
