import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from 'src/controllers/auth.controller';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { MailModule } from './email.module';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'), // 환경 변수에서 비밀 키 가져오기
                signOptions: { expiresIn: '1h' }, // 토큰 만료 시간 설정
                // global: true,
            }),
            inject: [ConfigService],
        }),
        MailModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtModule],
})
export class AuthModule { }
