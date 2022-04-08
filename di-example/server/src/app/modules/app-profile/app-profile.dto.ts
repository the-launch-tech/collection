import { Expose } from 'class-transformer';
import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

import { ProjectDTO } from '@project/project.dto';
import { BaseDTO } from '@base/base.dto';
import { UserDTO } from '@user/user.dto';
import { AccountDTO } from '@account/account.dto';

export enum AppProfileType {
    Presets = 'presets',
    Settings = 'settings',
    Profile = 'profile',
    Theme = 'theme'
}

export interface AppProfileData {}

export class AppProfileDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    account!: AccountDTO;

    @Expose()
    @IsNotEmpty()
    user!: UserDTO;

    @Expose()
    @IsOptional()
    project!: ProjectDTO;

    @Expose()
    @IsNotEmpty()
    @IsEnum(AppProfileType)
    type!: AppProfileType;

    @Expose()
    @IsNotEmpty()
    data!: AppProfileData;

    constructor(model?: Partial<AppProfileDTO>) {
        super();

        Object.assign(this, model);
    }
}
