import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { CrawlerService } from './crawler.service';
import { FatSecretDto } from './dto/crawler.dto';

@Controller('api/crawler')
export class CrawlerController {
    constructor(private crawlerService: CrawlerService) { }

    @UseGuards(AuthGuard)
    @Get('/fat-secret')
    @UseInterceptors(TransformInterceptor)
    async getFatSecret(@Query() fatSecretDto: FatSecretDto) {
        try {
            return this.crawlerService.list(fatSecretDto);
        } catch (error) {
            console.log('error', error)
        }
    }
}
