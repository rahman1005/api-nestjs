import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto, VerificationAccountDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('register')
    @UseInterceptors(TransformInterceptor)
    async register(@Body() body: RegisterAuthDto) {
        try {
            return this.authService.register(body);
        } catch (error) {
            console.log('error', error.message)
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseInterceptors(TransformInterceptor)
    async login(@Body() body: LoginAuthDto) {
        try {
            return this.authService.login(body);
        } catch (error) {
            console.log('error', error.message);
        }
    }

    @Post('request-verification-account')
    async requestVerificationAccount(@Body() body: VerificationAccountDto) {
        try {
            return this.authService.verificationAccount(body);
        } catch (error) {
            console.log('error', error.message);
        }
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    @UseInterceptors(TransformInterceptor)
    async getProfile(@Request() req) {
        try {
            return req.user;
        } catch (error) {
            console.log('error', error.message)
        }
    }
}
