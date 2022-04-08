import { Entity, Column, ManyToOne, Unique } from 'typeorm';
import { IsNotEmpty, IsString, Length } from 'class-validator';

import { OptionData } from '@option/option.dto';
import { ProjectEntity } from '@project/project.entity';
import { BaseEntity } from '@base/base.entity';

@Entity('option')
@Unique(['key'])
export class OptionEntity extends BaseEntity {
    @ManyToOne((type) => ProjectEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    project!: ProjectEntity;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 40,
        nullable: false,
        default: null,
        unique: true
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    key!: string;

    @Column({
        name: 'value',
        type: 'jsonb',
        nullable: false,
        default: { data: null }
    })
    @IsNotEmpty()
    value!: OptionData;

    constructor(entity?: Partial<OptionEntity>) {
        super();

        Object.assign(this, entity);
    }
}
