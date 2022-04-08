import { Entity, Column, ManyToOne, Unique, JoinColumn, OneToOne } from 'typeorm';
import { IsNotEmpty, IsString, Length, IsEnum, ValidateIf } from 'class-validator';

import { FileType, FileSource } from '@file/file.dto';
import { ProjectEntity } from '@project/project.entity';
import { BaseEntity } from '@base/base.entity';
import { AccountEntity } from '../account/account.entity';
import { UserEntity } from '../user/user.entity';

@Entity('file')
@Unique(['slug', 'path'])
export class FileEntity extends BaseEntity {
    @ManyToOne((type) => AccountEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    account!: AccountEntity;

    @ManyToOne((type) => UserEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    user!: UserEntity;

    @ManyToOne((type) => ProjectEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    project!: ProjectEntity;

    @OneToOne((type) => FileEntity, { onDelete: 'CASCADE' })
    @JoinColumn()
    @IsNotEmpty()
    @ValidateIf((o) => o.type === FileType.Jpg || o.type === FileType.Png)
    thumbnail!: FileEntity;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
        nullable: false,
        default: null,
        unique: false
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 255)
    name!: string;

    @Column({
        name: 'slug',
        type: 'varchar',
        length: 255,
        nullable: false,
        default: null,
        unique: true
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 255)
    slug!: string;

    @Column({
        name: 'type',
        type: 'enum',
        enum: FileType,
        nullable: false,
        default: null
    })
    @IsNotEmpty()
    @IsEnum(FileType)
    type!: FileType;

    @Column({
        name: 'source',
        type: 'enum',
        enum: FileSource,
        nullable: false,
        default: null
    })
    @IsNotEmpty()
    @IsEnum(FileSource)
    source!: FileSource;

    @Column({
        name: 'host',
        type: 'varchar',
        nullable: false,
        default: null
    })
    @IsNotEmpty()
    @IsString()
    host!: string;

    @Column({
        name: 'path',
        type: 'varchar',
        length: 500,
        nullable: false,
        default: null,
        unique: true
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    path!: string;

    constructor(entity?: Partial<FileEntity>) {
        super();

        Object.assign(this, entity);
    }
}
