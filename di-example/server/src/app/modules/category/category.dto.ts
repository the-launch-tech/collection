import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

import { ProjectDTO } from '@project/project.dto';
import { BaseDTO } from '@base/base.dto';

export class CategoryDTO extends BaseDTO {
    @Expose()
    @IsOptional()
    parent!: CategoryDTO;

    @Expose()
    @IsOptional()
    children!: CategoryDTO[];

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    depth!: number;

    @Expose()
    @IsNotEmpty()
    project!: ProjectDTO;

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
    @IsOptional()
    @IsString()
    @Length(0, 500)
    description!: string;

    constructor(model?: Partial<CategoryDTO>) {
        super();

        Object.assign(this, model);
    }
}
