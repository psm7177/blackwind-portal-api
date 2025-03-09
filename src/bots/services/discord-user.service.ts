import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommandInteraction } from "discord.js";

import { RegistrationDto } from "src/dtos/discord/registration.dto";
import { DiscordUser } from "src/models/DiscordUser.entity";
import { User } from "src/models/User.entity";
import { InvalidAccessException } from "../exceptions/invaild-access.exception";

@Injectable()
export class DiscordUserService {
    constructor(
        @InjectRepository(DiscordUser)
        private readonly discordUserRepository: Repository<DiscordUser>,
    ) { }

    async create(interaction: CommandInteraction) {
        const discordUserId = interaction.user.id;
        let discordUser = await this.discordUserRepository.findOne({ where: { discordUserId }, relations: ["user"] });

        if (discordUser?.user) {
            throw new InvalidAccessException("이미 등록된 유저입니다.");
        }

        // 새 사용자라면 등록 코드 생성
        const verificationCode = discordUser?.verificationCode ?? this.generateVerificationCode();

        if (!discordUser) {
            discordUser = this.discordUserRepository.create({ discordUserId, verificationCode });
            await this.discordUserRepository.save(discordUser);
        }

        await this.sendVerificationDM(interaction, verificationCode);
        return { verificationCode };
    }

    async sync(dto: RegistrationDto, user: User) {
        const discordUser = await this.discordUserRepository.findOne({ where: { verificationCode: dto.verificationCode }, relations: ["user"] });

        if (!discordUser) {
            throw new InvalidAccessException("인증 코드가 유효하지 않습니다.");
        }

        if (discordUser.user) {
            throw new InvalidAccessException("이미 등록된 유저입니다.");
        }

        discordUser.user = user;
        await this.discordUserRepository.save(discordUser);
        return { success: true };
    }

    private generateVerificationCode(): number {
        return Math.floor(10000000 + Math.random() * 90000000);
    }

    private async sendVerificationDM(interaction: CommandInteraction, verificationCode: number) {
        const channel = await interaction.user.createDM(true);
        await channel.send(`http://localhost:3000/discord/sync/${verificationCode}`);
        await interaction.reply({ content: "DM을 확인하세요!", ephemeral: true });
    }
}
