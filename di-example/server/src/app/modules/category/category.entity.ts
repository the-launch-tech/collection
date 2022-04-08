import {
    Entity,
    Column,
    ManyToOne,
    Unique,
    ManyToMany,
    Tree,
    TreeParent,
    TreeChildren,
    TreeLevelColumn
} from 'typeorm';
import { IsNotEmpty, IsString, Length, IsOptional, IsNumber } from 'class-validator';

import { BaseEntity } from '@base/base.entity';
import { ProjectEntity } from '@project/project.entity';
import { PostEntity } from '@post/post.entity';

@Entity('category')
@Unique(['slug'])
@Tree('closure-table')
export class CategoryEntity extends BaseEntity {
    @TreeParent()
    @IsOptional()
    parent!: CategoryEntity;

    @TreeChildren()
    @IsOptional()
    children!: CategoryEntity[];

    @TreeLevelColumn()
    @IsNotEmpty()
    @IsNumber()
    depth!: number;

    @ManyToOne((type) => ProjectEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    project!: ProjectEntity;

    @ManyToMany((type) => PostEntity, (post) => post.categories)
    @IsOptional()
    posts!: PostEntity[];

    @Column({
        name: 'name',
        type: 'varchar',
        default: null,
        length: 40,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    name!: string;

    @Column({
        name: 'slug',
        type: 'varchar',
        default: null,
        length: 40,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    slug!: string;

    @Column({
        name: 'description',
        type: 'varchar',
        default: null,
        length: 500,
        nullable: true
    })
    @IsOptional()
    @IsString()
    @Length(0, 500)
    description!: string;

    constructor(entity?: Partial<CategoryEntity>) {
        super();

        Object.assign(this, entity);
    }
}
