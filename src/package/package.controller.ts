import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { CreatePackageDto, ListPackageDto } from './dto/package.dto';
import { PackageService } from './package.service';

@Controller('package')
export class PackageController {
    constructor(private packageService: PackageService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('package')
    @UseInterceptors(TransformInterceptor)
    async create(@Body() createPackageDto: CreatePackageDto) {
        try {
            return this.packageService.create(createPackageDto);
        } catch (error) {
            console.log('error', error)
        }
    }

    @HttpCode(HttpStatus.OK)
    @Get('package')
    @UseInterceptors(TransformInterceptor)
    async list(@Query() listPackageDto: ListPackageDto) {
        try {
            return this.packageService.all(listPackageDto);
        } catch (error) {
            console.log('error', error)
        }
    }
}
