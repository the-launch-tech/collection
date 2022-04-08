import { Entity, Column, ManyToOne, Unique, JoinTable, ManyToMany } from 'typeorm';
import { IsNotEmpty, IsString, Length } from 'class-validator';

import { PostData } from '@post/post.dto';
import { ProjectEntity } from '../project/project.entity';
import { CategoryEntity } from '../category/category.entity';
import { PostTypeEntity } from '../post-type/post-type.entity';
import { BaseEntity } from '../base/base.entity';

@Entity('post')
@Unique(['slug'])
export class PostEntity extends BaseEntity {
    @ManyToOne((type) => ProjectEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    project!: ProjectEntity;

    @ManyToOne((type) => PostTypeEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    postType!: PostTypeEntity;

    @ManyToMany((type) => CategoryEntity, (category) => category.posts)
    @JoinTable()
    @IsNotEmpty()
    categories!: CategoryEntity[];

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
        name: 'data',
        type: 'jsonb',
        nullable: false,
        default: {}
    })
    @IsNotEmpty()
    data!: PostData;

    constructor(entity?: Partial<PostEntity>) {
        super();

        Object.assign(this, entity);
    }
}
