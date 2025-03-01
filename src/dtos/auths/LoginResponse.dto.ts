import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
    @ApiProperty()
    success: boolean;

    @ApiProperty()
    accessToken: string;
}