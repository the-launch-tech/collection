import {
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    VersionColumn
} from 'typeorm';
import { IsNotEmpty, IsDate, IsOptional, IsNumber } from 'class-validator';

export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uid!: string;

    @Column({ name: 'created_at' })
    @IsNotEmpty()
    @IsDate()
    @CreateDateColumn()
    createdAt!: Date;

    @Column({ name: 'updated_at' })
    @IsNotEmpty()
    @IsDate()
    @UpdateDateColumn()
    updatedAt!: Date;

    @Column({ name: 'deleted_at' })
    @IsOptional()
    @IsDate()
    @DeleteDateColumn()
    deletedAt!: Date;

    @Column({ name: 'version' })
    @IsNotEmpty()
    @IsNumber()
    @VersionColumn()
    version!: number;
}
