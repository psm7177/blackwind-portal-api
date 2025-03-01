import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from 'src/services/email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // 환경 변수 모듈 추가
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('SMTP_SERVER'),
          port: config.get<number>('SMTP_PORT', 465), // 기본값 587 설정
          auth: {
            user: config.get<string>('MAIL_SYSTEM_USERNAME'),
            pass: config.get<string>('MAIL_SYSTEM_PASSWORD'),
          },
        },
        defaults: {
          from: `"blackwind-portal-system" <${config.get<string>('MAIL_SYSTEM_ADDRESS')}>`,
        },
        template: {
          dir: __dirname + '/../templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
