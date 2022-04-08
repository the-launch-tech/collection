import { IsNotEmpty, IsString, Length, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { Expose } from 'class-transformer';

import { AccountDTO } from '../account/account.dto';
import { UserDTO } from '../user/user.dto';
import { BaseDTO } from '../base/base.dto';

export enum DatabaseType {
    Postgres = 'postgres'
}

export class ProjectDatabase {
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    name!: string;

    @IsNotEmpty()
    @IsEnum(DatabaseType)
    type!: 'postgres';

    @IsNotEmpty()
    @IsString()
    host!: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1000)
    @Max(9999)
    port!: number;

    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    username!: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    password!: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    database!: string;

    constructor(model?: Partial<ProjectDatabase>) {
        Object.assign(this, model);
    }
}

export class ProjectDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    account!: AccountDTO;

    @Expose()
    @IsNotEmpty()
    manager!: UserDTO;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    name!: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    slug!: string;

    @Expose()
    @IsNotEmpty()
    database!: ProjectDatabase;

    constructor(model?: Partial<ProjectDTO>) {
        super();

        Object.assign(this, model);
    }
}
