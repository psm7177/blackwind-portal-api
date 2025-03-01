import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
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

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findById(id: string): Promise<User> {
        return this.userRepository.findOne({
            where: { id },
        });
    }

    async create(dto: CreateUserDto): Promise<User> {
        const user = await this.newUser(dto);
        return this.save(user);
    }

    async newUser(dto: CreateUserDto): Promise<User> {
        let user = new User();
        user.name = dto.name;
        user.email = dto.email;
        user.department = dto.department;
        user.studentId = dto.studentId;
        user.password = dto.password;

        user.generateVerificationCode();
        return user;
    }

    async save(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async findOne(options: FindOneOptions<User>) {
        return this.userRepository.findOne(options);
    }
}
