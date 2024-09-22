import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
}

export enum UserStatus {
  UNCONFIRMED = 'uncomfirmed',
  ACTIVE = 'active',
  BANNED = 'banned',
  SLEEP = 'sleep'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: UserRole.STUDENT, type: 'enum', enum: UserRole, nullable: false })
  role: UserRole;

  @Column({ default: 'uncomfirmed' })
  status: UserStatus;

  @Column({ default: false })
  department: string;

  @Column({ default: false, unique: true })
  studentId: string;
  
  // @Column({ default: false })
  // verificationToken: string;  
}
