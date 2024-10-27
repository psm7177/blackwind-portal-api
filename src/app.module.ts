import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotModule } from './modules/bot.module';
import { DiscordModule } from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',  // 사용 중인 데이터베이스 유형
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
    DiscordModule.forRootAsync({
      useFactory: () => ({
        token: '',
        discordClientOptions: {
          intents: [GatewayIntentBits.Guilds],
        },
      }),
    }),
    BotModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
