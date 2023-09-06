import { Types } from "mongoose";
import { StatusAppointment } from "../interfaces/appointment.interface";

export class CreateAppointmentDto {
    userId: Types.ObjectId;
    providerId: Types.ObjectId;
    corporateId?: Types.ObjectId;
    startTime: Date;
    endTime: Date;
    status: StatusAppointment
}
