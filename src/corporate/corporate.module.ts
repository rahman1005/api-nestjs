import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CorporateService } from './corporate.service';
import { Corporate, CorporateSchema } from './schemas/corporate.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Corporate.name, schema: CorporateSchema }])],
  providers: [CorporateService],
  exports: [CorporateService]
})
export class CorporateModule { }
