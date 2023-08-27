import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://novizarhadisaputra:iZja896YqaGrwJ4j@cluster0.m2fkfwm.mongodb.net/?retryWrites=true&w=majority'),
    BullModule.forRoot({
      redis: {
        host: 'redis-15249.c1.ap-southeast-1-1.ec2.cloud.redislabs.com',
        port: 15249,
      },
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    ProductModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
