import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { PackageService } from 'src/package/package.service';
import { CreateSubscriptionDto, SendRequestSubscriptionDto } from './dto/subscription.dto';
import { SubscriptionStatus } from './interfaces/subscription.interface';
import { Subscription } from './schemas/subscription.schema';
@Injectable()
export class SubscriptionService {
    constructor(@InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>, private packageService: PackageService) { }

    async create(data: CreateSubscriptionDto): Promise<Subscription> {
        const packages = await this.packageService.findById(data.packageId);
        if (!packages) {
            throw new Error('package not found');
        }
        const saltRounds: number = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const stringData = data.picName + data.picPhone + data.picEmail + data.startDate + data.endDate;
        const hash = await bcrypt.hash(stringData, salt);

        const clientStringData = 'client' + stringData;
        const clientHash = await bcrypt.hash(clientStringData, salt);

        const subscriptionId = new Types.ObjectId();

        const body: Subscription = {
            _id: subscriptionId,
            packageId: packages._id,
            picName: data.picName,
            picPhone: data.picPhone,
            picEmail: data.picEmail,
            price: packages.price,
            startDate: data.startDate,
            endDate: data.endDate,
            status: SubscriptionStatus.PENDING,
            serverKey: hash,
            clientKey: clientHash
        }
        return await this.subscriptionModel.create(body);
    }

    async sendRequest(data: SendRequestSubscriptionDto) {

    }
}
