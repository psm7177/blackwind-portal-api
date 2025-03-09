import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { PingCommand } from '../commands/ping.command';
import { RegistrationCommand } from '../commands/registration.command';
import { DiscordUserModule } from './discord-user.module';
import { LeaveOfAbsenceCommand } from '../commands/leave-of-absence.command';


@Module({
  imports: [DiscordModule.forFeature(), DiscordUserModule],
  providers: [PingCommand, RegistrationCommand, LeaveOfAbsenceCommand],
})
export class CommandsModule { }
