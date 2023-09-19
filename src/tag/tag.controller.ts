import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtPayloadInterface } from 'src/auth/interfaces/auth.interface';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { User } from 'src/user/decorators/user.decorator';
import { CreateTagDto } from './dto/tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
    constructor(private articleService: TagService) { }

    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @Post('store')
    @UseInterceptors(TransformInterceptor)
    async create(@Body() createTagDto: CreateTagDto, @User() user: JwtPayloadInterface) {
        try {
            return this.articleService.create(createTagDto, user);
        } catch (error) {
            console.log('error', error)
        }
    }
}
