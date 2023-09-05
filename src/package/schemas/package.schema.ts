
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Package {
    @Prop({ required: true })
    _id: Types.ObjectId;

    @Prop({ required: true })
    code: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    status: boolean;
}

export type PackageDocument = HydratedDocument<Package>;
export const PackageSchema = SchemaFactory.createForClass(Package);
