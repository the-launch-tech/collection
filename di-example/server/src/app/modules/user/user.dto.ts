import { Length, IsNotEmpty, IsString, ValidateNested, IsEmail, IsEnum, IsOptional, IsArray } from 'class-validator';
import { Expose } from 'class-transformer';

import { AccountDTO } from '@account/account.dto';
import { ProjectDTO } from '@project/project.dto';
import { BaseDTO } from '@base/base.dto';

export enum UserRole {
    User = 'user',
    Editor = 'editor',
    Admin = 'admin',
    Super = 'super'
}

export class UserDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    account!: AccountDTO;

    @Expose()
    @IsOptional()
    projects!: ProjectDTO[];

    @Expose()
    @IsNotEmpty()
    defaultProject!: ProjectDTO;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    username!: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    firstName!: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    lastName!: string;

    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @Expose()
    @IsNotEmpty()
    @IsEnum(UserRole)
    role!: UserRole;

    @Expose()
    @IsOptional()
    @IsString()
    resetPasswordToken!: string;

    @Expose()
    @IsOptional()
    @IsString()
    resetPasswordExpires!: Date;

    constructor(model?: Partial<UserDTO>) {
        super();

        Object.assign(this, model);
    }
}

export class CreateUserDTOBody {
    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    username!: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    firstName!: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    lastName!: string;

    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @Expose()
    @IsNotEmpty()
    @IsEnum(UserRole)
    role!: UserRole;

    @Expose()
    @IsNotEmpty()
    @IsString()
    accountUid!: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    projectUid!: string;

    constructor(model?: Partial<CreateUserDTOBody>) {
        Object.assign(this, model);
    }
}

export class CreateUserDTO {
    @IsNotEmpty()
    params!: Record<string, never>;

    @IsNotEmpty()
    query!: Record<string, never>;

    @IsNotEmpty()
    @ValidateNested()
    body: CreateUserDTOBody;

    constructor(model?: Partial<CreateUserDTO>) {
        Object.assign(this, model);

        this.body = new CreateUserDTOBody(model?.body);
    }
}
