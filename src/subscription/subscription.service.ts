import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { PackageService } from 'src/package/package.service';
import { SubscriptionStatus } from './interfaces/subscription.interface';
import { Subscription } from './schemas/subscription.schema';
@Injectable()
export class SubscriptionService {
    constructor(@InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>, private packageService: PackageService) { }

    async create(createSubscriptionDto: Subscription) {
        const packages = await this.packageService.findById(createSubscriptionDto.packageId);
        if (!packages) {
            throw new Error('package not found');
        }
        const saltRounds: number = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const stringData = createSubscriptionDto.picName + createSubscriptionDto.picPhone + createSubscriptionDto.picEmail + createSubscriptionDto.startDate + createSubscriptionDto.endDate;
        const hash = await bcrypt.hash(stringData, salt);

        const subscriptionId = new Types.ObjectId();
        const body: Subscription = {
            _id: subscriptionId,
            packageId: packages._id,
            picName: createSubscriptionDto.picName,
            picPhone: createSubscriptionDto.picPhone,
            picEmail: createSubscriptionDto.picEmail,
            price: packages.price,
            startDate: createSubscriptionDto.startDate,
            endDate: createSubscriptionDto.endDate,
            status: SubscriptionStatus.PENDING,
            apiKey: hash
        }
        return await this.subscriptionModel.create(body);
    }

}
