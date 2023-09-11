import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailingService } from 'src/mailing/mailing.service';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';
import { LoginAuthDto, RegisterAuthDto, RequestVerificationAccountDto, VerificationAccountDto } from './dto/auth.dto';
import { JwtPayloadInterface } from './interfaces/auth.interface';
@Injectable({})
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private mailingService: MailingService
    ) { }

    async register(data: RegisterAuthDto) {
        const user: User = await this.userService.findByEmail(data.email);
        if (user) {
            throw new HttpException('user available', HttpStatus.BAD_REQUEST);
        }
        return await this.userService.create(data);
    }

    async login(data: LoginAuthDto) {
        const user: User = await this.userService.findByEmail(data.email, ['_id', 'email', 'password', 'isVerified', 'phone']);
        if (!user) {
            throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            throw new HttpException('credential not match', HttpStatus.BAD_REQUEST);
        }

        if (!user.isVerified) {
            throw new HttpException('user not verified', HttpStatus.BAD_REQUEST);
        }

        const payload: JwtPayloadInterface = { _id: user._id, email: user.email, phone: user.phone };
        const token = await this.jwtService.signAsync(payload, {
            privateKey: jwtConstants.secret
        });

        return { token };
    }

    async requestVerificationAccount(data: RequestVerificationAccountDto) {
        const isMatch = await this.userService.findByEmail(data.email);
        if (!isMatch) {
            throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
        }
        const otp = Math.round(Math.random() * 999999).toString();
        await this.userService.updateByEmail(data.email, { otp })
        await this.mailingService.send({
            to: [data.email],
            from: 'developer.healthbeing@gmail.com',
            subject: 'Verification Email',
            template: 'verification',
            data: { otp, email: data.email }
        });
        return { email: data.email }
    }

    async requestForgetPasswordAccount(data: RequestVerificationAccountDto) {
        const isMatch = await this.userService.findByEmail(data.email);
        if (!isMatch) {
            throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
        }
        const otp = Math.round(Math.random() * 999999).toString();
        await this.userService.updateByEmail(data.email, { otp })
        await this.mailingService.send({
            to: [data.email],
            from: 'developer.healthbeing@gmail.com',
            subject: 'Verification Forget Password',
            template: 'verification',
            data: { otp, email: data.email }
        });
        return { email: data.email }
    }

    async verificationForgetPassword(data: VerificationAccountDto): Promise<boolean> {
        const isExist = await this.userService.findByEmail(data.email, ['email', 'otp']);
        if (!isExist) {
            throw new HttpException('credential not valid', HttpStatus.BAD_REQUEST);
        }
        if (!isExist.otp || isExist.otp !== data.otp) {
            return false;
        }

        await this.userService.updateByEmail(data.email, {
            isVerified: new Date(),
            otp: ''
        });
        return true;
    }

    async verificationAccount(data: VerificationAccountDto): Promise<User> {
        const isExist = await this.userService.findByEmail(data.email, ['email', 'otp']);
        if (!isExist) {
            throw new HttpException('credential not valid', HttpStatus.BAD_REQUEST);
        }
        if (!isExist.otp || isExist.otp !== data.otp) {
            throw new HttpException('otp not valid', HttpStatus.BAD_REQUEST);
        }

        await this.userService.updateByEmail(data.email, {
            isVerified: new Date(),
            otp: ''
        });
        return await this.userService.findByEmail(data.email);
    }

    async profile(data: JwtPayloadInterface): Promise<User> {
        return await this.userService.findById(data._id, ['_id', 'email', 'firstName', 'lastName', 'phone', 'age']);
    }
}
