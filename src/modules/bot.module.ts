import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from 'src/gateways/bot.gateway';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [BotGateway],
})
export class BotModule {}
