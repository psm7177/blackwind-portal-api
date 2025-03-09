import { Module } from "@nestjs/common";
import { DiscordBotModule } from "src/bots/discord-bot.module";
import { DiscordUserModule } from "src/bots/modules/discord-user.module";
import { DiscordController } from "src/controllers/discord.controller";

@Module({
    imports: [DiscordUserModule, DiscordBotModule],
    controllers:[DiscordController]
})
export class DiscordModule {}