import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, Length, ValidateNested } from 'class-validator';

import { ProjectDTO } from '../project/project.dto';
import { BaseDTO } from '../base/base.dto';
import { MenuItemDTO } from '../menu-item/menu-item.dto';

export class MenuDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    @ValidateNested()
    project!: ProjectDTO;

    @Expose()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    menuItems!: MenuItemDTO[];

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    name!: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    slug!: string;

    @Expose()
    @IsNotEmpty()
    @IsBoolean()
    disabled!: boolean;

    constructor(model?: Partial<MenuDTO>) {
        super();

        Object.assign(this, model);

        this.project = new ProjectDTO(model?.project);
        this.menuItems = (model?.menuItems || []).map((item) => new MenuItemDTO(item));
    }
}
