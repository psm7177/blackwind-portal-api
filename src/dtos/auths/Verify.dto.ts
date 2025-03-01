import { ApiProperty } from "@nestjs/swagger";

export class VerifyDto {
    @ApiProperty()
    code: string;
}