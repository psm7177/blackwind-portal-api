import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';


import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { DiscordBotModule } from './bots/discord-bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역에서 사용 가능하도록 설정
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // 사용 중인 데이터베이스 유형
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    DiscordBotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('user'); // 'match' 경로에 JWT 미들웨어 적용
  }
}