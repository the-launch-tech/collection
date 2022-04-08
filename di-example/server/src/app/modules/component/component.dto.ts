import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, ValidateNested } from 'class-validator';

import { ProjectDTO } from '../project/project.dto';
import { BaseDTO } from '../base/base.dto';
import { ComponentTypeDTO } from '../component-type/component-type.dto';

export class ComponentStaticData {
    public meta!: Record<string, unknown>;

    constructor(model?: Partial<ComponentStaticData>) {
        Object.assign(this, model);
    }
}

export class ComponentDTO extends BaseDTO {
    @Expose()
    @IsOptional()
    parent!: ComponentDTO;

    @Expose()
    @IsOptional()
    children!: ComponentDTO[];

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    depth!: number;

    @Expose()
    @IsNotEmpty()
    project!: ProjectDTO;

    @Expose()
    @IsNotEmpty()
    componentType!: ComponentTypeDTO;

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
    @IsString()
    filePath!: string;

    @Expose()
    @IsNotEmpty()
    staticData!: ComponentStaticData;

    constructor(model?: Partial<ComponentDTO>) {
        super();

        Object.assign(this, model);
    }
}
