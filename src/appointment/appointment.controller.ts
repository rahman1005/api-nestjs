import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtPayloadInterface } from 'src/auth/interfaces/auth.interface';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { User } from 'src/user/decorators/user.decorator';
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
    async register(@Body() body: CreateAppointmentDto, @User() user: JwtPayloadInterface) {
        try {
            return this.appointmentService.create(body, user);
        } catch (error) {
            console.log('error', error.message)
        }
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('list')
    @UseInterceptors(TransformInterceptor)
    async list(@Query() listAppointmentDto: ListAppointmentDto, @User() user: JwtPayloadInterface) {
        try {
            return this.appointmentService.all(listAppointmentDto, user);
        } catch (error) {
            console.log('error', error.message)
        }
    }
}
