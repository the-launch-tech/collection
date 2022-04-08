import { Entity, Column, ManyToOne, Unique } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { BaseEntity } from '../base/base.entity';
import { ProjectEntity } from '../project/project.entity';

@Entity('component_type')
@Unique(['slug'])
export class ComponentTypeEntity extends BaseEntity {
    @ManyToOne((type) => ProjectEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    project!: ProjectEntity;

    @Column({
        name: 'name',
        type: 'character varying',
        length: 60,
        nullable: false,
        unique: false
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 60)
    name!: string;

    @Column({
        name: 'slug',
        type: 'character varying',
        length: 60,
        nullable: false,
        unique: true
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 60)
    slug!: string;

    @Column({
        name: 'description',
        type: 'character varying',
        length: 500,
        nullable: true,
        default: null
    })
    @IsOptional()
    @IsString()
    description?: string;

    constructor(entity?: Partial<ComponentTypeEntity>) {
        super();

        Object.assign(this, entity);
    }
}
