import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from 'src/gateways/bot.gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GatewayIntentBits, Message } from 'discord.js';
import { CommandsModule } from './modules/command.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { DiscordExceptionFilter } from 'src/filters/discord-exception.filter';
import { GuildOnlyGuard } from './guards/guild-only.guard';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('DISCORD_TOKEN'),
        discordClientOptions: {
          intents: [GatewayIntentBits.Guilds],
        },
        registerCommandOptions: [{
          removeCommandsBefore: true,
          forGuild: configService.get<string>('GUILD_ID'),
          allowFactory: (message: Message) =>
            !message.author.bot
        }],
      }),
    }),
    CommandsModule, // 커맨드를 처리하는 모듈을 임포트합니다
  ],
  providers: [BotGateway,
    {
      provide: APP_FILTER,
      useClass: DiscordExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: GuildOnlyGuard, // 모든 명령어에 자동 적용
    },
  ],
})
export class DiscordBotModule { }