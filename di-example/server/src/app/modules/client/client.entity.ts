import { Entity, Column, ManyToOne, Unique } from 'typeorm';
import { IsNotEmpty, IsString, Length } from 'class-validator';

import { AccountEntity } from '../account/account.entity';
import { BaseEntity } from '../base/base.entity';

@Entity('client')
@Unique(['slug', 'key'])
export class ClientEntity extends BaseEntity {
    @ManyToOne((type) => AccountEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    account!: AccountEntity;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 40,
        nullable: false,
        default: null
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    name!: string;

    @Column({
        name: 'slug',
        type: 'varchar',
        length: 40,
        nullable: false,
        default: null,
        unique: true
    })
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    slug!: string;

    @Column({
        name: 'key',
        type: 'varchar',
        nullable: false,
        default: null,
        unique: true
    })
    @IsNotEmpty()
    @IsString()
    key!: string;

    constructor(entity?: Partial<ClientEntity>) {
        super();

        Object.assign(this, entity);
    }
}
