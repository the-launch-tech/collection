import { Entity, Column, Unique, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Length, IsNotEmpty, IsString, IsEmail, IsEnum, IsOptional, ValidateIf } from 'class-validator';

import { UserRole } from '@user/user.dto';
import { AccountEntity } from '@account/account.entity';
import { ProjectEntity } from '@project/project.entity';
import { BaseEntity } from '@base/base.entity';

@Entity('user')
@Unique(['username', 'email'])
export class UserEntity extends BaseEntity {
    @ManyToOne(() => AccountEntity, (account) => account.users, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    account!: AccountEntity;

    @ManyToMany((type) => ProjectEntity)
    @JoinTable()
    @IsNotEmpty()
    projects!: ProjectEntity[];

    @ManyToOne((type) => ProjectEntity)
    @IsOptional()
    defaultProject!: ProjectEntity;

    @Column({
        name: 'username',
        type: 'varchar',
        length: 40,
        nullable: false,
        default: null,
        unique: true
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    username!: string;

    @Column({
        name: 'first_name',
        type: 'varchar',
        length: 40,
        nullable: false,
        default: null
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    firstName!: string;

    @Column({
        name: 'last_name',
        type: 'varchar',
        length: 40,
        nullable: false,
        default: null
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    lastName!: string;

    @Column({
        name: 'email',
        type: 'varchar',
        nullable: false,
        default: null
    })
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 255,
        nullable: true,
        default: null
    })
    @IsNotEmpty()
    @ValidateIf((o) => !o.passwordToken)
    @IsString()
    @Length(8, 255)
    password!: string;

    @Column({
        name: 'password_token',
        type: 'varchar',
        nullable: true,
        default: null
    })
    @IsNotEmpty()
    @ValidateIf((o) => !o.password)
    @IsString()
    passwordToken!: string;

    @Column({
        name: 'role',
        type: 'enum',
        enum: UserRole,
        nullable: false,
        default: UserRole.User
    })
    @IsNotEmpty()
    @IsEnum(UserRole)
    role!: UserRole;

    @Column({
        name: 'reset_password_token',
        type: 'varchar',
        nullable: true,
        default: null
    })
    @IsOptional()
    @IsString()
    resetPasswordToken!: string;

    @Column({
        name: 'reset_password_expires',
        type: 'varchar',
        nullable: true,
        default: null
    })
    @IsOptional()
    @IsString()
    resetPasswordExpires?: Date;

    constructor(entity?: Partial<UserEntity>) {
        super();

        Object.assign(this, entity);
    }
}
