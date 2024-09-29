import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/dtos/auths/Register.dto';
import { UserService } from './user.services';
import { AuthDetailDto } from 'src/dtos/auths/AuthDetail.dto';
import { LoginDto } from 'src/dtos/auths/Login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ) { }

    async register(registerDto: RegisterDto): Promise<AuthDetailDto> {
        // check if user already exists 
        let existingUser = await this.userService.findOne(registerDto.email);
        if (existingUser) {
            throw new Error('User already exists'); // TODO: change to http exception
        }
        // TODO: check email validation (dgist email)
        // TODO: check password validation (length, special character, etc)

        const newUser = await this.userService.create({
            name: registerDto.name,
            email: registerDto.email,
            department: registerDto.department,
            studentId: registerDto.studentId,
            password: registerDto.password, // TODO: encrypt password
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
        }
    }
    async login(loginDto: LoginDto): Promise<AuthDetailDto>{
        const user = await this.userService.findOne(loginDto.email);

        if(!user || user.password !== loginDto.password){
            throw new Error('Email and password do not match'); // TODO: change to http exception
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
        }
    }
}   
