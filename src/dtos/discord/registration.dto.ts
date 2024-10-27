import { Param } from '@discord-nestjs/core';

export class RegistrationDto {
    @Param({ description: 'verify code', required: true })
    verificationCode: string;
}