import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, ValidateIf } from 'class-validator';

import { ProjectDTO } from '../project/project.dto';
import { BaseDTO } from '../base/base.dto';
import { MenuDTO } from '../menu/menu.dto';

export class MenuItemDTO extends BaseDTO {
    @Expose()
    @IsOptional()
    parent!: MenuItemDTO;

    @Expose()
    @IsOptional()
    children!: MenuItemDTO[];

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    depth!: number;

    @Expose()
    @IsNotEmpty()
    menu!: MenuDTO;

    @Expose()
    @IsNotEmpty()
    project!: ProjectDTO;

    @Expose()
    @ValidateIf((o) => !o.toHref && !o.toContent)
    @IsNotEmpty()
    @IsString()
    toPath?: string;

    @Expose()
    @ValidateIf((o) => !o.toPath && !o.toContent)
    @IsNotEmpty()
    @IsString()
    toHref?: string;

    @Expose()
    @ValidateIf((o) => !o.toHref && !o.toPath)
    @IsNotEmpty()
    @IsString()
    toContent?: string;

    @Expose()
    @IsOptional()
    @IsString()
    target?: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    label!: string;

    @Expose()
    @IsOptional()
    @IsString()
    icon?: string;

    constructor(model?: Partial<MenuItemDTO>) {
        super();

        Object.assign(this, model);
    }
}
