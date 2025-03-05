import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { CommandInteraction, Message } from 'discord.js';

@Catch()
export class DiscordExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.getArgByIndex<CommandInteraction>(0);

    if (ctx instanceof CommandInteraction) {
      ctx.reply(exception.message || '알 수 없는 오류가 발생했습니다.');
    }
  }
}
