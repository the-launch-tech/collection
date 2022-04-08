import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length, ValidateNested } from 'class-validator';

import { ProjectDTO } from '../project/project.dto';
import { PostTypeDTO } from '../post-type/post-type.dto';
import { CategoryDTO } from '../category/category.dto';
import { BaseDTO } from '../base/base.dto';

export class PostData {
    public meta!: Record<string, unknown>;

    constructor(model?: Partial<PostData>) {
        Object.assign(this, model);
    }
}

export class PostDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    @ValidateNested()
    project!: ProjectDTO;

    @Expose()
    @IsNotEmpty()
    @ValidateNested()
    postType!: PostTypeDTO;

    @Expose()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    categories!: CategoryDTO[];

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
    data!: PostData;

    constructor(model?: Partial<PostDTO>) {
        super();

        Object.assign(this, model);

        this.project = new ProjectDTO(model?.project);
        this.postType = new PostTypeDTO(model?.postType);
        this.categories = (model?.categories || []).map((item) => new CategoryDTO(item));
    }
}
