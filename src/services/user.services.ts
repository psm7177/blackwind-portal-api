// write user service

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/User.entity';
import { CreateUserDto } from 'src/dtos/users/CreateUser.dto';
import { UserDetailDto } from 'src/dtos/users/UserDetail.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    // write CRUD for user
    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(dto: CreateUserDto): Promise<UserDetailDto> {
        let user = new User();
        user.name = dto.name;
        user.email = dto.email;
        user.department = dto.department;
        user.studentId = dto.studentId;
        user.password = dto.password;

        user = await this.userRepository.save(user);

        return {
            id: user.id,
            status: user.status,
            role: user.role,
            name: user.name,
            email: user.email,
            department: user.department,
            studentId: user.studentId,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }
}
