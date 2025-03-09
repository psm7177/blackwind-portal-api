
import { Module } from '@nestjs/common';
import { DiscordUserService } from '../services/discord-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscordUser } from 'src/models/DiscordUser.entity';
import { User } from 'src/models/User.entity';


@Module({
  imports: [TypeOrmModule.forFeature([DiscordUser, User])],
  providers: [DiscordUserService],
  exports: [DiscordUserService],
})
export class DiscordUserModule { }