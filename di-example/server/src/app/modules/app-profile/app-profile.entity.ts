import { Entity, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

import { BaseEntity } from '@base/base.entity';
import { UserEntity } from '@user/user.entity';
import { ProjectEntity } from '@project/project.entity';
import { AccountEntity } from '@account/account.entity';
import { AppProfileType, AppProfileData } from '@app-profile/app-profile.dto';

@Entity('app_profile')
export class AppProfileEntity extends BaseEntity {
    @ManyToOne((type) => AccountEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    account!: AccountEntity;

    @ManyToOne((type) => UserEntity)
    @IsNotEmpty()
    user!: UserEntity;

    @ManyToOne((type) => ProjectEntity, { onDelete: 'CASCADE' })
    @IsOptional()
    project!: ProjectEntity;

    @Column({
        name: 'type',
        type: 'enum',
        enum: AppProfileType,
        default: null,
        nullable: false
    })
    @IsNotEmpty()
    @IsEnum(AppProfileType)
    type!: AppProfileType;

    @Column({
        name: 'data',
        type: 'jsonb',
        default: {},
        nullable: false
    })
    @IsNotEmpty()
    data!: AppProfileData;

    constructor(model?: Partial<AppProfileEntity>) {
        super();

        Object.assign(this, model);
    }
}
