import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { PingCommand } from './ping.command';
import { RegistrationCommand } from './registration.command';


@Module({
  imports: [DiscordModule.forFeature()],
  providers: [PingCommand, RegistrationCommand],
})
export class CommandsModule {}
