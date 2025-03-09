import { Command, Handler } from '@discord-nestjs/core';
import { Injectable, UseFilters, UseGuards } from '@nestjs/common';
import { CommandInteraction } from 'discord.js';
import { DiscordUserService } from 'src/bots/services/discord-user.service';
import { DiscordExceptionFilter } from 'src/filters/discord-exception.filter';
import { GuildOnlyGuard } from '../guards/guild-only.guard';

@Command({
    name: 'registration',
    description: 'User registration',
})
@Injectable()
@UseFilters(DiscordExceptionFilter)
export class RegistrationCommand {
    constructor(private readonly discordUserService: DiscordUserService) { }

    @Handler()
    @UseGuards(GuildOnlyGuard)
    async onRegistration(
        interaction: CommandInteraction
    ): Promise<string> {
        // get id from interaction
        await this.discordUserService.create(interaction);
        return '';
    }
}
