
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, } from 'mongoose';
import { StatusAppointment } from '../interfaces/appointment.interface';

@Schema({ timestamps: true })
export class Appointment {
    @Prop({ required: true })
    _id: Types.ObjectId;

    @Prop({ required: true })
    providerId: Types.ObjectId

    @Prop()
    corporateId?: Types.ObjectId

    @Prop()
    startTime: Date

    @Prop()
    endTime: Date

    @Prop()
    status: StatusAppointment
}

export type AppointmentDocument = HydratedDocument<Appointment>;
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
