import { Injectable, Logger } from '@nestjs/common';
import { Once, InjectDiscordClient, On } from '@discord-nestjs/core';
import { Client, Events, GuildMember } from 'discord.js';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Once(Events.ClientReady)
  onReady() {
    this.logger.log(`Bot ${this.client.user.tag} was started!`);
    // check server id
  }
  @On(Events.GuildMemberAdd)
  onUserUpdate(member: GuildMember){
    this.logger.log(`Hello ${member.nickname}`);
  }

  // @On(Events.ApplicationCommandPermissionsUpdate)
  // onCommandPermissionsUpdate() {
  //   this.logger.log('Command permissions updated!');
  // }
}