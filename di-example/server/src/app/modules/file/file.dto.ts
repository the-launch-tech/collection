import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length, ValidateNested, IsEnum, ValidateIf } from 'class-validator';

import { ProjectDTO } from '@project/project.dto';
import { BaseDTO } from '@base/base.dto';
import { UserDTO } from '@user/user.dto';
import { AccountDTO } from '@account/account.dto';

export enum FileType {
    Jpg = 'jpg',
    Png = 'png',
    Svg = 'svg',
    Pdf = 'pdf',
    Doc = 'doc',
    Csv = 'csv',
    Word = 'word'
}

export enum FileSource {
    Local = 'local',
    ThirdParty = 'third-party'
}

export class FileDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    account!: AccountDTO;

    @Expose()
    @IsNotEmpty()
    user!: UserDTO;

    @Expose()
    @IsNotEmpty()
    project!: ProjectDTO;

    @Expose()
    @IsNotEmpty()
    @ValidateIf((o) => o.type === FileType.Jpg || o.type === FileType.Png)
    thumbnail!: FileDTO;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 255)
    name!: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 255)
    slug!: string;

    @Expose()
    @IsNotEmpty()
    @IsEnum(FileType)
    type!: FileType;

    @Expose()
    @IsNotEmpty()
    @IsEnum(FileSource)
    source!: FileSource;

    @Expose()
    @IsNotEmpty()
    @ValidateIf((o) => o.source !== FileSource.Local)
    @IsString()
    host!: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    path!: string;

    constructor(model?: Partial<FileDTO>) {
        super();

        Object.assign(this, model);

        this.account = new AccountDTO(model?.account);
        this.user = new UserDTO(model?.user);
        this.project = new ProjectDTO(model?.project);
        this.thumbnail = new FileDTO(model?.thumbnail);
    }
}
