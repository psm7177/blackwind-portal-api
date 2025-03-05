import { Command, Handler } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

@Command({ name: 'ping', description: 'ping!!'})
@Injectable()
export class PingCommand {
    @Handler()
    async execute(message: Message) {
        // !ping 명령어를 입력받으면 'Pong!'을 답변
        message.reply('Pong!');
    }
}
