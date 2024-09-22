import { Module } from '@nestjs/common';
import { UserService } from 'src/services/user.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/User.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
