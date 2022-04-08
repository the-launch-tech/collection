import { Entity, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString, Length, IsEnum } from 'class-validator';

import { ValidateNestedActionMeta } from '@decorators/validate-nested-action-meta.decorator';
import { BaseEntity } from '@base/base.entity';
import { UserEntity } from '@user/user.entity';
import { ProjectEntity } from '@project/project.entity';
import { AccountEntity } from '@account/account.entity';
import { ActionEventType, ActionEventMetaUnion } from '@action-event/action-event.dto';

@Entity('action_event')
export class ActionEventEntity extends BaseEntity {
    @ManyToOne((type) => AccountEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    account!: AccountEntity;

    @ManyToOne((type) => UserEntity)
    @IsNotEmpty()
    user!: UserEntity;

    @ManyToOne((type) => ProjectEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    project!: ProjectEntity;

    @Column({
        name: 'name',
        type: 'varchar',
        default: null,
        length: 100,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 100)
    name!: string;

    @Column({
        name: 'type',
        type: 'enum',
        enum: ActionEventType,
        nullable: false
    })
    @IsNotEmpty()
    @IsEnum(ActionEventType)
    type!: ActionEventType;

    @Column({
        name: 'meta',
        type: 'jsonb',
        default: {},
        nullable: false
    })
    @IsNotEmpty()
    @ValidateNestedActionMeta()
    meta!: ActionEventMetaUnion;

    constructor(model?: Partial<ActionEventEntity>) {
        super();

        Object.assign(this, model);
    }
}
