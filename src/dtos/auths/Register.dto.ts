import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    department: string;
    
    @ApiProperty()
    studentId: string;
}