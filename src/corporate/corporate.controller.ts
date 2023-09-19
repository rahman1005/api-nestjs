import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { CorporateService } from './corporate.service';
import { CreateCorporateDto } from './dto/corporate.dto';
import { ListCorporateDto } from './interfaces/corporate.interface';
@Controller('api/corporate')
export class CorporateController {
    constructor(private corporateService: CorporateService) { }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post('store')
    @UseInterceptors(TransformInterceptor)
    async register(@Body() body: CreateCorporateDto) {
        try {
            return this.corporateService.create(body);
        } catch (error) {
            console.log('error', error.message)
        }
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('list')
    @UseInterceptors(TransformInterceptor)
    async list(@Query() listCorporateDto: ListCorporateDto) {
        try {
            return this.corporateService.all(listCorporateDto);
        } catch (error) {
            console.log('error', error.message)
        }
    }
}
