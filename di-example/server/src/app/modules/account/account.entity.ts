import { Entity, OneToMany } from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { ProjectEntity } from '../project/project.entity';
import { ClientEntity } from '../client/client.entity';
import { BaseEntity } from '../base/base.entity';
import { IsOptional } from 'class-validator';

@Entity('account')
export class AccountEntity extends BaseEntity {
    @OneToMany((type) => UserEntity, (user) => user.account)
    @IsOptional()
    users!: UserEntity[];

    @OneToMany((type) => ProjectEntity, (project) => project.account)
    @IsOptional()
    projects!: ProjectEntity[];

    @OneToMany((type) => ClientEntity, (client) => client.account)
    @IsOptional()
    clients!: ClientEntity[];

    constructor(entity?: Partial<AccountEntity>) {
        super();

        Object.assign(this, entity);
    }
}
