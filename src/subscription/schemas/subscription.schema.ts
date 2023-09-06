
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { SubscriptionStatus } from '../interfaces/subscription.interface';

@Schema({ timestamps: true })
export class Subscription {
    @Prop({ required: true })
    _id: Types.ObjectId;

    @Prop({ required: false })
    corporateId?: Types.ObjectId;

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
    status: SubscriptionStatus;

    @Prop({ required: true })
    apiKey: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;
}

export type SubscriptionDocument = HydratedDocument<Subscription>;
export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
