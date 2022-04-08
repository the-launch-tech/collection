import { Entity, Column, ManyToOne, Tree, TreeParent, TreeChildren, TreeLevelColumn } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString, Length, ValidateIf } from 'class-validator';

import { MenuEntity } from '../menu/menu.entity';
import { BaseEntity } from '../base/base.entity';
import { ProjectEntity } from '../project/project.entity';

@Entity('menu_item')
@Tree('closure-table')
export class MenuItemEntity extends BaseEntity {
    @TreeParent()
    @IsOptional()
    parent!: MenuItemEntity;

    @TreeChildren()
    @IsOptional()
    children!: MenuItemEntity[];

    @TreeLevelColumn()
    depth!: number;

    @ManyToOne((type) => MenuEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    menu!: MenuEntity;

    @ManyToOne((type) => ProjectEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    project!: ProjectEntity;

    @Column({
        name: 'to_path',
        type: 'varchar',
        nullable: true,
        default: null
    })
    @ValidateIf((o) => !o.toHref && !o.toContent)
    @IsNotEmpty()
    @IsString()
    toPath?: string;

    @Column({
        name: 'to_href',
        type: 'varchar',
        nullable: true,
        default: null
    })
    @ValidateIf((o) => !o.toPath && !o.toContent)
    @IsNotEmpty()
    @IsString()
    toHref?: string;

    @Column({
        name: 'to_content',
        type: 'varchar',
        nullable: true,
        default: null
    })
    @ValidateIf((o) => !o.toHref && !o.toPath)
    @IsNotEmpty()
    @IsString()
    toContent?: string;

    @Column({
        name: 'target',
        type: 'varchar',
        nullable: true,
        default: null
    })
    @IsOptional()
    @IsString()
    target?: string;

    @Column({
        name: 'label',
        type: 'varchar',
        length: 40,
        nullable: false,
        default: null
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    label!: string;

    @Column({
        name: 'icon',
        type: 'varchar',
        nullable: true,
        default: null
    })
    @IsOptional()
    @IsString()
    icon?: string;

    constructor(entity?: Partial<MenuItemEntity>) {
        super();

        Object.assign(this, entity);
    }
}
