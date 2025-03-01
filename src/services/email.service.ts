import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';
import { UserDetailDto } from 'src/dtos/users/UserDetail.dto';
import { User } from 'src/models/User.entity';
@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    sendHello(): boolean {
        this.mailerService
            .sendMail({
                to: 'user@gmail.com',
                from: 'noreplay@gmail.com',
                subject: 'Hello',
                text: 'Hello World',
                html: '<b>Hello World</b>',
            })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                new ConflictException(error);
            });
        return true;
    }

    async sendVerification(user: User): Promise<boolean> {
        const verificationLink = `http://localhost:3000/auth/verify?code=${user.verificationCode}`;
        await this.mailerService.sendMail({
            to: user.email,
            subject: '현풍전산 - 이메일 인증',
            template: './mail/verification', // "templates/verification.hbs" 파일 사용
            context: {
                name: user.name, // 템플릿에서 사용할 데이터
                verificationLink: verificationLink,
            },
        });
        return true;
    }
}