import { ApiProperty } from "@nestjs/swagger";
import { UserDetailDto } from "../users/UserDetail.dto";

export class AuthDetailDto {
    @ApiProperty()
    success: boolean;

    @ApiProperty()
    user: UserDetailDto;
}