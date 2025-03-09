import { Command, Handler } from '@discord-nestjs/core';
import { Injectable, UseFilters, UseGuards } from '@nestjs/common';
import { CommandInteraction, GuildMember } from 'discord.js';
import { DiscordUserService } from 'src/bots/services/discord-user.service';
import { DiscordExceptionFilter } from 'src/filters/discord-exception.filter';
import { GuildOnlyGuard } from '../guards/guild-only.guard';
import { InvalidAccessException } from '../exceptions/invaild-access.exception';

@Command({
    name: 'leave_of_absence',
    description: '휴학 신청',
    nameLocalizations: {
        "en-US": 'leave-of-absence',
        "ko": '휴학'
    }
})
@Injectable()
@UseFilters(DiscordExceptionFilter)
export class LeaveOfAbsenceCommand {
    constructor(private readonly discordUserService: DiscordUserService) { }

    @Handler()
    @UseGuards(GuildOnlyGuard)
    async onLeaveOfAbsence(
        interaction: CommandInteraction
    ): Promise<void> {
        // 현재 명령어를 실행한 사용자 정보를 가져옵니다.
        const member = await interaction.guild.members.fetch(interaction.member.user.id);

        // '휴학생' 역할을 찾습니다.
        const role = member.guild.roles.cache.find(role => role.name === '휴학생');

        if (!role) {
            // 역할이 없으면 오류 메시지 반환
            throw new InvalidAccessException('해당 역할을 찾을 수 없습니다.');
        }

        try {
            // 역할을 부여합니다.
            if (member instanceof GuildMember) {
                await member.roles.add(role); // role 객체를 사용
            }
            // 역할 부여 성공 메시지
            interaction.reply({ content: `${role.name} 역할이 부여되었습니다.`, ephemeral: true });

        } catch (error) {
            console.error(error);
            throw new InvalidAccessException('역할을 부여하는 데 오류가 발생했습니다.');
        }
    }
}
