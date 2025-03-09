// create code

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegistrationDto } from "src/dtos/discord/registration.dto";
import { DiscordUser } from "src/models/DiscordUser.entity";
import { User } from "src/models/User.entity";
import { Repository } from "typeorm";
import { InvalidAccessException } from "../exceptions/invaild-access.exception";
import { CommandInteraction } from "discord.js";

// connect code
@Injectable()
export class DiscordUserService {
    constructor(
        @InjectRepository(DiscordUser)
        private readonly discordUserRepository: Repository<DiscordUser>,
    ) { }

    async create(interaction: CommandInteraction) {
        const discordUserId = interaction.user.id;
        const discordUser = await this.discordUserRepository.findOne({
            where: {
                discordUserId
            }
        });

        if (discordUser.user) {
            throw new InvalidAccessException("이미 등록된 유저 입니다. 해당 유저는 존재 합니다.");
        }

        if (discordUser) {
            throw new InvalidAccessException("이미 등록된 유저 입니다. 해당 유저는 존재 합니다.");
        }
        const newDiscordUser = new DiscordUser();

        newDiscordUser.discordUserId = discordUserId;

        const verificationCode = Math.floor(10000000 + Math.random() * 90000000);
        newDiscordUser.verificationCode = verificationCode;

        // Optionally save the entity if needed
        await this.discordUserRepository.save(newDiscordUser);

        const channel = await interaction.user.createDM(true);
        channel.send(`http://localhost:3000/discord/sync/${verificationCode}`);

        interaction.reply({ content: 'DM을 확인하세요!', ephemeral: true });

        return {
            verificationCode: newDiscordUser.verificationCode
        };
    }
    async sync(dto: RegistrationDto, user: User) {
        const discordUser = await this.discordUserRepository.findOne({
            where: {
                verificationCode: dto.verificationCode
            }
        });

        if (!discordUser) {
            throw new InvalidAccessException("해당 유저는 존재하지 않습니다.");
        }

        discordUser.user = user;

        await this.discordUserRepository.save(discordUser);
    }
}