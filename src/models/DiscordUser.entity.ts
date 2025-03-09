import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class DiscordUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User, {cascade: true})
    @JoinColumn()
    user: User

    @Column({ unique: true })
    discordUserId: string;

    @Column()
    verificationCode: number; // 8 digits
}