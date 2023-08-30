import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailingService } from 'src/mailing/mailing.service';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';
import { LoginAuthDto, RegisterAuthDto, VerificationAccountDto } from './dto/auth.dto';

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
        const user: User = await this.userService.findByEmail(data.email, ['_id', 'email', 'password']);
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

        const payload = { sub: user._id, email: user.email, phone: user.phone };
        const token = await this.jwtService.signAsync(payload, {
            privateKey: jwtConstants.secret
        });

        return { user, token };
    }

    async requestVerificationAccount(data: VerificationAccountDto) {
        const isMatch = this.userService.findByEmail(data.email);
        if (!isMatch) {
            throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
        }
        await this.mailingService.send();
        return { email: data.email }
    }

    async verificationAccount(data: VerificationAccountDto) {
        const isMatch = this.userService.findByEmail(data.email);
        if (!isMatch) {
            throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
        }
        return { email: data.email }
    }
}
