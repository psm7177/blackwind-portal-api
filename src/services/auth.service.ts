import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { RegisterDto } from 'src/dtos/auths/Register.dto';
import { UserService } from './user.services';
import { AuthDetailDto } from 'src/dtos/auths/AuthDetail.dto';
import { LoginDto } from 'src/dtos/auths/Login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ) { }

    async register(registerDto: RegisterDto): Promise<AuthDetailDto> {
        // Check if user already exists 
        const existingUser = await this.userService.findOne(registerDto.email);
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        // Check for valid email (DGIST-specific)
        if (!registerDto.email.endsWith('@dgist.ac.kr')) {
            throw new BadRequestException('Invalid email domain. Please use a DGIST email.');
        }

        // Validate password (length, special character, etc.)
        if (!this.isValidPassword(registerDto.password)) {
            throw new BadRequestException('Password must be at least 8 characters long and contain a special character.');
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        // Create new user
        const newUser = await this.userService.create({
            name: registerDto.name,
            email: registerDto.email,
            department: registerDto.department,
            studentId: registerDto.studentId,
            password: hashedPassword, 
        });

        // TODO: send email to user

        return {
            success: true,
            user: {
                id: newUser.id.toString(),
                status: newUser.status,
                role: newUser.role,
                name: newUser.name,
                email: newUser.email,
                department: newUser.department,
                studentId: newUser.studentId,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
            }
        };
    }

    async login(loginDto: LoginDto): Promise<AuthDetailDto> {
        const user = await this.userService.findOne(loginDto.email);

        // Check if user exists and verify password
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException('Email and password do not match');
        }

        return {
            success: true,
            user: {
                id: user.id.toString(),
                status: user.status,
                role: user.role,
                department: user.department,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        };
    }

    private isValidPassword(password: string): boolean {
        // Example validation: at least 8 characters, one special character
        const regex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    }
}
