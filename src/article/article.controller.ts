import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/article.dto';

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('store')
    @UseInterceptors(TransformInterceptor)
    async create(@Body() createArticleDto: CreateArticleDto) {
        try {
            return this.articleService.create(createArticleDto);
        } catch (error) {
            console.log('error', error)
        }
    }
}
