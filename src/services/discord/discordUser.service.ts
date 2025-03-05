// create code

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegistrationDto } from "src/dtos/discord/registration.dto";
import { DiscordUser } from "src/models/DiscordUser.entity";
import { User } from "src/models/User.entity";
import { Repository } from "typeorm";

// connect code
@Injectable()
export class DiscordUserService {
    constructor(
        @InjectRepository(DiscordUser)
        private readonly discordUserRepository: Repository<DiscordUser>,
    ) { }

    async create() {
        // get user 

        const discordUser = this.discordUserRepository.create();

        // Generate an 8-digit random number
        const verificationNumber = Math.floor(10000000 + Math.random() * 90000000);
        discordUser.verificationNumber = verificationNumber;

        // Optionally save the entity if needed
        await this.discordUserRepository.save(discordUser);

        return {
            verificationNumber: discordUser.verificationNumber
        };
    }
    async connect(dto: RegistrationDto, user: User) {

    }
}