import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { CreateSubscriptionDto, SendRequestSubscriptionDto } from './dto/subscription.dto';
import { SubscriptionService } from './subscription.service';

@Controller('api/subscription')
export class SubscriptionController {
    constructor(private subscriptionService: SubscriptionService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('store')
    @UseInterceptors(TransformInterceptor)
    async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
        try {
            return this.subscriptionService.create(createSubscriptionDto);
        } catch (error) {
            console.log('error', error)
        }
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('send-request')
    @UseInterceptors(TransformInterceptor)
    async sendRequest(@Body() sendRequestDto: SendRequestSubscriptionDto) {
        try {
            return this.subscriptionService.sendRequest(sendRequestDto);
        } catch (error) {
            console.log('error', error)
        }
    }
}
