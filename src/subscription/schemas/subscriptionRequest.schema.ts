
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SubscriptionRequest {
    @Prop({ required: true })
    _id: Types.ObjectId;

    @Prop({ required: true })
    corporateName?: string;

    @Prop({ required: true })
    picName: string;

    @Prop({ required: true })
    picPhone: string;

    @Prop({ required: true })
    picEmail: string;

    @Prop({ required: true })
    packageId: Types.ObjectId;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;
}

export type SubscriptionRequestDocument = HydratedDocument<SubscriptionRequest>;
export const SubscriptionRequestSchema = SchemaFactory.createForClass(SubscriptionRequest);
