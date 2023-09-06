
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, } from 'mongoose';
import { StatusCorporate } from '../interfaces/corporate.interface';

@Schema({ timestamps: true })
export class Corporate {
    @Prop({ required: true })
    _id: Types.ObjectId;

    @Prop({ required: false })
    name: string;

    @Prop({ required: false })
    corporateId?: Types.ObjectId

    @Prop({ required: true })
    picName: string;

    @Prop({ required: true })
    picPhone: string;

    @Prop({ required: true })
    picEmail: string;

    @Prop()
    status: StatusCorporate;
}

export type CorporateDocument = HydratedDocument<Corporate>;
export const CorporateSchema = SchemaFactory.createForClass(Corporate);
