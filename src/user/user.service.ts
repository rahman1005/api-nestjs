import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, ObjectId, Types } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const saltRounds: number = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(createUserDto.password, salt);
        const userId = new Types.ObjectId();
        const body: User = {
            _id: userId,
            email: createUserDto.email,
            phone: createUserDto.phone,
            password: hash,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            age: createUserDto.age
        }
        const createdUser = new this.userModel(body);
        return await createdUser.save();
    }

    async findById(id: ObjectId, fields: Array<keyof User> = ['_id']): Promise<User> {
        return await this.userModel.findById(id).select(fields).lean();
    }

    async findByEmail(email: string, fields: Array<keyof User> = ['email']): Promise<User> {
        return await this.userModel.findOne({ email: email }).select(fields).lean();
    }

    async findByPhone(phone: string, fields: Array<keyof User> = ['phone']): Promise<User> {
        return await this.userModel.findOne({ phone }).select(fields).lean();
    }
}
