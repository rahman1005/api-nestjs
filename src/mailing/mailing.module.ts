import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp-relay.brevo.com',
                port: 587,
                auth: {
                    user: 'developerhealthbeing@gmail.com',
                    pass: 'qx706kDyVTWhZPb3',
                },
            },
            template: {
                dir: join(__dirname, '../..', 'views/emails'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),

    ]
})
export class MailingModule { }
