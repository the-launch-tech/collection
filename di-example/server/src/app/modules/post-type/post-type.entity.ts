import { Entity, Column, ManyToOne, Unique } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { ProjectEntity } from '@project/project.entity';
import { BaseEntity } from '@base/base.entity';

@Entity('post_type')
@Unique(['slug'])
export class PostTypeEntity extends BaseEntity {
    @ManyToOne((type) => ProjectEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    project!: ProjectEntity;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 60,
        nullable: false,
        default: null
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 60)
    name!: string;

    @Column({
        name: 'slug',
        type: 'varchar',
        length: 60,
        nullable: false,
        default: null,
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
    @Length(0, 500)
    description?: string;

    constructor(entity?: Partial<PostTypeEntity>) {
        super();

        Object.assign(this, entity);
    }
}
