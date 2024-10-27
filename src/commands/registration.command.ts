import { Command, InteractionEvent, Handler } from '@discord-nestjs/core';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { Injectable } from '@nestjs/common';
import { RegistrationDto } from 'src/dtos/discord/registration.dto';


@Command({
    name: 'registration',
    description: 'User registration',
})
@Injectable()
export class ResistrationCommand {
    constructor(){
        
    }
    @Handler()
    onRegistration(@InteractionEvent(SlashCommandPipe) options: RegistrationDto): string {
        // registration with discord.service
        return '';
        // return `User was registered with name: ${options.name}, age ${options.age} and city ${options.city}`;
    }
}