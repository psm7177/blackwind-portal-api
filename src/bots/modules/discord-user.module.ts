
import { Module } from '@nestjs/common';
import { DiscordUserService } from '../services/discord-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscordUser } from 'src/models/DiscordUser.entity';


@Module({
  imports: [TypeOrmModule.forFeature([DiscordUser])],
  providers: [DiscordUserService],
  exports: [DiscordUserService]
})
export class DiscordUserModule {}