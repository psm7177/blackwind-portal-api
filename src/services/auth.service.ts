import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { RegisterDto } from 'src/dtos/auths/Register.dto';
import { UserService } from './user.services';
import { AuthDetailDto } from 'src/dtos/auths/AuthDetail.dto';
import { LoginDto } from 'src/dtos/auths/Login.dto';
import * as bcrypt from 'bcrypt';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { VerifyDto } from 'src/dtos/auths/Verify.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from 'src/dtos/auths/LoginResponse.dto';
import { MailService } from './email.service';
import { User, UserStatus } from 'src/models/User.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
        private mailService: MailService
    ) { }

    async register(registerDto: RegisterDto): Promise<AuthDetailDto> {
        // Check if user already exists 
        const existingUser = await this.userService.findByEmail(registerDto.email);
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
        const newUser = await this.userService.newUser({
            name: registerDto.name,
            email: registerDto.email,
            department: registerDto.department,
            studentId: registerDto.studentId,
            password: hashedPassword,
        });
        
        // TODO: send email to user
        await this.mailService.sendVerification(newUser);

        await this.userService.save(newUser);

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

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        const user = await this.userService.findByEmail(loginDto.email);

        // Check if user exists and verify password
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException('Email and password do not match');
        }
        
        if (user.status !== UserStatus.ACTIVE) {
            throw new ForbiddenException('Your account is not active.');
        }

        // const userDto = {
        //     id: user.id.toString(),
        //     status: user.status,
        //     role: user.role,
        //     department: user.department,
        //     createdAt: user.createdAt,
        //     updatedAt: user.updatedAt,
        // }

        const payload = { username: user.name, sub: user.id }

        return {
            success: true,
            accessToken: this.jwtService.sign(payload)
        };
    }

    async verify(dto: VerifyDto): Promise<AuthDetailDto> {
        const user = await this.userService.findOne({ where: { verificationCode: dto.code } });

        // Check if user exists and verify password
        if (!user) {
            throw new UnauthorizedException('Email and password do not match');
        }

        user.status = UserStatus.ACTIVE;

        await this.userService.save(user);
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
        }
    }

    private isValidPassword(password: string): boolean {
        // Example validation: at least 8 characters, one special character
        const regex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    }
}
