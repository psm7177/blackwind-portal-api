import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from 'src/services/email.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_SERVER,
        port: 587,
        auth: {
          user: process.env.MAIL_SYSTEM_USERNAME,
          pass: process.env.MAIL_SYSTEM_PASSWORD,
        },
      },
      defaults: {
        from: `'"blackwind-portal-system" <${process.env.MAIL_SYSTEM_ADDRESS}>`,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}