import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtPayloadInterface } from 'src/auth/interfaces/auth.interface';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { User } from 'src/user/decorators/user.decorator';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/article.dto';

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) { }

    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @Post('store')
    @UseInterceptors(TransformInterceptor)
    async create(@Body() createArticleDto: CreateArticleDto, @User() user: JwtPayloadInterface) {
        try {
            return this.articleService.create(createArticleDto, user);
        } catch (error) {
            console.log('error', error)
        }
    }
}
