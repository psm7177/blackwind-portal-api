import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class DiscordUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @Column({ unique: true })
    discordUserId: string;

    @Column()
    verificationNumber: number; // 8 digits
}