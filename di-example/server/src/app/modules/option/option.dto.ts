import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length, ValidateNested } from 'class-validator';

import { ProjectDTO } from '@project/project.dto';
import { BaseDTO } from '@base/base.dto';

export class OptionData<DATA = any> {
    public data!: DATA;

    constructor(model?: Partial<OptionData<DATA>>) {
        Object.assign(this, model);
    }
}

export class OptionDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    @ValidateNested()
    project!: ProjectDTO;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    name!: string;

    @Expose()
    @IsNotEmpty()
    value!: OptionData;

    constructor(model?: Partial<OptionDTO>) {
        super();

        Object.assign(this, model);

        this.project = new ProjectDTO(model?.project);
    }
}
