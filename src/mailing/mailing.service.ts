import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailingSendInterface } from './interfaces';

@Injectable()
export class MailingService {
    constructor(
        private readonly mailerService: MailerService,
    ) { }

    async send({ to, from, subject, template, data }: MailingSendInterface) {
        await this.mailerService.sendMail({
            to: to,
            from: from,
            subject: subject,
            template: template,
            context: data
        }).then((success) => {
            console.log('success', success);
        }).catch((error) => {
            console.log('error.message', error.message)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        });
    }
}
