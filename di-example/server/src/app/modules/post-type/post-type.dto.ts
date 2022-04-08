import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, Length, ValidateNested } from 'class-validator';

import { ProjectDTO } from '@project/project.dto';
import { BaseDTO } from '@base/base.dto';

export class PostTypeDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    @ValidateNested()
    project!: ProjectDTO;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 60)
    name!: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 60)
    slug!: string;

    @Expose()
    @IsOptional()
    @IsString()
    @Length(0, 500)
    description?: string;

    constructor(model?: Partial<PostTypeDTO>) {
        super();

        Object.assign(this, model);

        this.project = new ProjectDTO(model?.project);
    }
}
