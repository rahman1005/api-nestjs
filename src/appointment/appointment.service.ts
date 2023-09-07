import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { JwtPayloadInterface } from 'src/auth/interfaces/auth.interface';
import { CreateAppointmentDto } from './dto/appointment.dto';
import { ListAppointmentDto, StatusAppointment } from './interfaces/appointment.interface';
import { Appointment } from './schemas/appointment.schema';

@Injectable()
export class AppointmentService {
    constructor(@InjectModel(Appointment.name) private appointmentModel: Model<Appointment>) { }

    async create(createAppointmentDto: CreateAppointmentDto, user: JwtPayloadInterface): Promise<Appointment> {
        const appointmentId = new Types.ObjectId();
        const provider = "";
        if (!provider) {
            throw new Error('provider not found');
        }
        const body: Appointment = {
            _id: appointmentId,
            providerId: createAppointmentDto.providerId,
            startTime: createAppointmentDto.startTime,
            endTime: createAppointmentDto.endTime,
            status: StatusAppointment.PENDING
        }
        const createdAppointment = new this.appointmentModel(body);
        await createdAppointment.save();
        return await this.findById(createdAppointment._id, ['_id']);
    }

    async all(query: ListAppointmentDto, user: JwtPayloadInterface) {
        return await this.appointmentModel.find();
    }

    async findById(id: Types.ObjectId, fields: Array<keyof Appointment> = ['_id']): Promise<Appointment> {
        return await this.appointmentModel.findById(id).select(fields).lean();
    }
}
