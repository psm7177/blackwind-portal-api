import { Command, Handler } from '@discord-nestjs/core';
import { Injectable, UseGuards } from '@nestjs/common';
import { CommandInteraction } from 'discord.js';
import { GuildOnlyGuard } from '../guards/guild-only.guard';

@Command({
    name: 'registration',
    description: 'User registration',
})
@Injectable()
export class RegistrationCommand {
    constructor() { }

    @Handler()
    // @UseGuards(GuildOnlyGuard)
    async onRegistration(
        interaction: CommandInteraction
        // @InteractionEvent() interaction: ChatInputCommandInteraction, // Interaction 객체 가져오기
    ): Promise<string> {
        const channel = await interaction.user.createDM(true);

        channel.send('http://localhost:3000');
        interaction.reply({ content: 'DM을 확인하세요!', ephemeral: true })
        
        return '';
    }
}
