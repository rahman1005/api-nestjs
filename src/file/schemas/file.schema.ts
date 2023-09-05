
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })export class File {
    @Prop({ required: true })
    _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    extension: string;

    @Prop({ required: true })
    folder: string;

    @Prop({ required: true })
    fileable_id: Types.ObjectId;

    @Prop({ required: true })
    fileable_type: string;
}

export type FileDocument = HydratedDocument<File>;
export const FileSchema = SchemaFactory.createForClass(File);
