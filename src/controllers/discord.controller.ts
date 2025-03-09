import { Controller, UseGuards, Request, Options, Body, UseFilters } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { DiscordUserService } from "src/bots/services/discord-user.service";
import { RegistrationDto } from "src/dtos/discord/registration.dto";

@ApiTags('discord')
@Controller('discord')
@ApiBearerAuth()
export class DiscordController {
    constructor(private readonly discordUserService: DiscordUserService) { }

    @Options('sync')
    @UseGuards(JwtAuthGuard)
    async registerDiscordUser(@Body() dto: RegistrationDto, @Request() req) {
        this.discordUserService.sync(dto, req.user);
    }
}

