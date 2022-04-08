import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length, ValidateNested, IsEnum, ValidateIf } from 'class-validator';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { ProjectDTO } from '@project/project.dto';

export enum TreeType {
    Branch = 'branch',
    Leaf = 'leaf'
}

export class RepositoryTree {
    @Expose()
    @IsNotEmpty()
    @IsString()
    uid!: string;

    @Expose()
    @IsNotEmpty()
    @IsEnum(TreeType)
    type!: TreeType;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 60)
    name!: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    fullPath!: string;

    @Expose()
    @IsNotEmpty()
    @ValidateIf((o) => o.type === TreeType.Branch)
    @ValidateNested({ each: true })
    children!: RepositoryTree[];

    constructor(model: Partial<RepositoryTree>, dirPath: string) {
        Object.assign(this, model);

        if (model.type === TreeType.Branch) {
            this.buildChildren(dirPath);
        }
    }

    public buildChildren(dirPath: string): void {
        for (const file of fs.readdirSync(dirPath)) {
            this.children.push(
                new RepositoryTree(
                    {
                        uid: uuidv4(),
                        name: file,
                        type: fs.statSync(dirPath + '/' + file).isDirectory() ? TreeType.Branch : TreeType.Leaf,
                        fullPath: path.join(dirPath, '/', file),
                        children: []
                    },
                    dirPath + '/' + file
                )
            );
        }
    }
}

export class RepositoryTreeDTO {
    @Expose()
    @IsNotEmpty()
    @ValidateNested()
    project!: ProjectDTO;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    tree!: RepositoryTree;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 60)
    directory!: string;

    constructor(model?: Partial<RepositoryTreeDTO>) {
        Object.assign(this, model);

        this.project = new ProjectDTO(model?.project);
    }
}

export class FindFileContentsDTOParams {
    @Expose()
    @IsNotEmpty()
    @IsString()
    projectSlug!: string;

    constructor(model?: Partial<FindFileContentsDTOParams>) {
        Object.assign(this, model);
    }
}

export class FindFileContentsDTOBody {
    @Expose()
    @IsNotEmpty()
    @IsString()
    fullPath!: string;

    constructor(model?: Partial<FindFileContentsDTOBody>) {
        Object.assign(this, model);
    }
}

export class FindFileContentsDTO {
    @IsNotEmpty()
    @ValidateNested()
    params!: FindFileContentsDTOParams;

    @IsNotEmpty()
    query!: Record<string, never>;

    @IsNotEmpty()
    @ValidateNested()
    body: FindFileContentsDTOBody;

    constructor(model?: Partial<FindFileContentsDTO>) {
        Object.assign(this, model);

        this.params = new FindFileContentsDTOParams(model?.params);
        this.body = new FindFileContentsDTOBody(model?.body);
    }
}

export class FileContentsDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    data!: string;

    constructor(model?: Partial<FileContentsDTO>) {
        Object.assign(this, model);
    }
}
