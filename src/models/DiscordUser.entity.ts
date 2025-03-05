import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class DiscordUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @Column({ nullable: true })
    discordUserId: number;

    @Column()
    verificationNumber: number; // 8 digits
}