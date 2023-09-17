
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, } from 'mongoose';
import { BloodUser, SexUser } from '../interfaces/user.interface';

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    _id: Types.ObjectId;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: false })
    lastName?: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    isVerified?: Date;

    @Prop({ required: false, minlength: 1, maxlength: 1 })
    sex?: SexUser;

    @Prop()
    age?: number;

    @Prop()
    height?: number;

    @Prop({ minlength: 1, maxlength: 2 })
    blood?: BloodUser;

}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
