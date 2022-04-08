import { Entity, Column, ManyToOne, Unique } from 'typeorm';
import { IsNotEmpty, IsString, Length } from 'class-validator';

import { ProjectDatabase } from '@project/project.dto';
import { AccountEntity } from '../account/account.entity';
import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../base/base.entity';

@Entity('project')
@Unique(['slug'])
export class ProjectEntity extends BaseEntity {
    @ManyToOne(() => AccountEntity, (account) => account.projects, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    account!: AccountEntity;

    @ManyToOne((type) => UserEntity)
    @IsNotEmpty()
    manager!: UserEntity;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 40,
        nullable: false,
        default: null
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    name!: string;

    @Column({
        name: 'slug',
        type: 'varchar',
        length: 40,
        nullable: false,
        default: null,
        unique: true
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    slug!: string;

    @Column({
        name: 'database',
        type: 'jsonb',
        nullable: false,
        default: {}
    })
    @IsNotEmpty()
    database!: ProjectDatabase;

    constructor(entity?: Partial<ProjectEntity>) {
        super();

        Object.assign(this, entity);
    }
}
