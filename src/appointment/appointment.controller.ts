import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/appointment.dto';
import { ListAppointmentDto } from './interfaces/appointment.interface';
@Controller('api/appointment')
export class AppointmentController {
    constructor(private appointmentService: AppointmentService) { }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post('store')
    @UseInterceptors(TransformInterceptor)
    async register(@Body() body: CreateAppointmentDto) {
        try {
            return this.appointmentService.create(body);
        } catch (error) {
            console.log('error', error.message)
        }
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('list')
    @UseInterceptors(TransformInterceptor)
    async list(@Query() listAppointmentDto: ListAppointmentDto) {
        try {
            return this.appointmentService.all(listAppointmentDto);
        } catch (error) {
            console.log('error', error.message)
        }
    }
}
