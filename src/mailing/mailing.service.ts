import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MailingService {
    constructor(
        private readonly mailerService: MailerService,
    ) { }

    async send() {
        await this.mailerService.sendMail({
            to: 'novizarhadisaputra@gmail.com',
            from: 'developer.healthbeing@gmail.com',
            subject: 'Testing Nest MailerModule',
            template: 'test',
        }).then((success) => {
            console.log('success', success);
        }).catch((error) => {
            console.log('error.message', error.message)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        });
    }
}
