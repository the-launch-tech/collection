import { Entity, Column, ManyToOne, Unique, OneToMany } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

import { ProjectEntity } from '../project/project.entity';
import { MenuItemEntity } from '../menu-item/menu-item.entity';
import { BaseEntity } from '../base/base.entity';

@Entity('menu')
@Unique(['slug'])
export class MenuEntity extends BaseEntity {
    @ManyToOne((type) => ProjectEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    project!: ProjectEntity;

    @OneToMany((type) => MenuItemEntity, (menuItem) => menuItem.menu)
    @IsNotEmpty()
    menuItems!: MenuItemEntity[];

    @Column({
        name: 'name',
        type: 'character varying',
        length: 40,
        nullable: false,
        unique: false
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
        unique: true
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    slug!: string;

    @Column({
        name: 'disabled',
        type: 'bool',
        nullable: false,
        default: false
    })
    @IsNotEmpty()
    @IsBoolean()
    disabled!: boolean;

    constructor(entity?: Partial<MenuEntity>) {
        super();

        Object.assign(this, entity);
    }
}
