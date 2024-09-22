import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole, UserStatus } from "src/models/User.entity";

export class UserDetailDto {
    @ApiProperty({ default: "123e4567-e89b-12d3-a456-426614174000" })
    id: string;
    @ApiProperty({ enum: UserStatus, default: UserStatus.UNCONFIRMED })
    status: UserStatus;
    @ApiProperty({ enum: UserRole, default: UserRole.STUDENT })
    role: UserRole;

    @ApiPropertyOptional({ default: "홍길동 | undefined"})
    name?: string;
    @ApiPropertyOptional({ default: "test@dgist.ac.kr | undefined" })
    email?: string;
    @ApiPropertyOptional({ default: "기초학부 | undefined" })
    department?: string;
    @ApiPropertyOptional({ default: "2017123456 | undefined" })
    studentId?: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}