import { Entity, Column, ManyToOne, Unique, TreeChildren, TreeParent, TreeLevelColumn, Tree } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { ComponentStaticData } from '@component/component.dto';
import { BaseEntity } from '../base/base.entity';
import { ProjectEntity } from '../project/project.entity';
import { ComponentTypeEntity } from '../component-type/component-type.entity';

@Entity('component')
@Unique(['slug'])
@Tree('closure-table')
export class ComponentEntity extends BaseEntity {
    @TreeParent()
    @IsOptional()
    parent!: ComponentEntity;

    @TreeChildren()
    @IsOptional()
    children!: ComponentEntity[];

    @TreeLevelColumn()
    depth!: number;

    @ManyToOne((type) => ProjectEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    project!: ProjectEntity;

    @ManyToOne((type) => ComponentTypeEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    componentType!: ComponentTypeEntity;

    @Column({
        name: 'name',
        type: 'character varying',
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
        type: 'character varying',
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
        name: 'file_path',
        type: 'character varying',
        length: 40,
        nullable: false,
        default: null
    })
    @IsNotEmpty()
    @IsString()
    filePath!: string;

    @Column({
        name: 'static_data',
        type: 'jsonb',
        nullable: false,
        default: {}
    })
    @IsNotEmpty()
    staticData!: ComponentStaticData;

    constructor(entity?: Partial<ComponentEntity>) {
        super();

        Object.assign(this, entity);
    }
}
