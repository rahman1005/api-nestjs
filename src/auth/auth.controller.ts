import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto, RequestVerificationAccountDto, VerificationAccountDto } from './dto/auth.dto';
@Controller('api/auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.CREATED)
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

    @HttpCode(HttpStatus.OK)
    @Post('request-verification-account')
    @UseInterceptors(TransformInterceptor)
    async requestVerificationAccount(@Body() body: RequestVerificationAccountDto) {
        try {
            return this.authService.requestVerificationAccount(body);
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('request-forget-password')
    @UseInterceptors(TransformInterceptor)
    async requestForgetPassword(@Body() body: RequestVerificationAccountDto) {
        try {
            return this.authService.requestForgetPasswordAccount(body);
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('verification-forget-password')
    @UseInterceptors(TransformInterceptor)
    async verificationForgetPassword(@Body() body: VerificationAccountDto) {
        try {
            return this.authService.verificationForgetPassword(body);
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('verification-account')
    @UseInterceptors(TransformInterceptor)
    async verificationAccount(@Body() body: VerificationAccountDto) {
        try {
            return this.authService.verificationAccount(body);
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    @UseInterceptors(TransformInterceptor)
    async getProfile(@Request() req) {
        try {
            return this.authService.profile(req.user);
        } catch (error) {
            throw error;
        }
    }
}
