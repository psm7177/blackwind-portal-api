
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDto {
    @ApiProperty({ description: 'verify code', required: true })
    verificationCode: number;
}