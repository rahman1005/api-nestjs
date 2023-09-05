
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SubscriptionLog {
    @Prop({ required: true })
    _id: Types.ObjectId;

    @Prop({ required: true })
    subscriptionId: Types.ObjectId;

    @Prop({ required: true })
    picName: string;

    @Prop({ required: true })
    picPhone: string;

    @Prop({ required: true })
    picEmail: string;

    @Prop({ required: false })
    packageId: Types.ObjectId;

    @Prop({ required: false })
    price: Types.ObjectId;

    @Prop({ required: false })
    apiKey: string;

    @Prop({ required: false })
    startDate: Date;

    @Prop({ required: false })
    endDate: Date;
}

export type SubscriptionLogDocument = HydratedDocument<SubscriptionLog>;
export const SubscriptionLogSchema = SchemaFactory.createForClass(SubscriptionLog);
