import { Controller, Put, UseGuards, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RegistrationDto } from "src/dtos/discord/registration.dto";
import { DiscordUserService } from "src/bots/services/discord-user.service";

@ApiTags('discord')
@Controller('user/discord')
export class DiscordController {
    constructor(private readonly discordUserService: DiscordUserService) { }

    @Put('discordUser')
    @UseGuards(JwtAuthGuard)
    async registerDiscordUser(dto: RegistrationDto, @Request() req) {
        this.discordUserService.connect(dto, req.user);
    }
}