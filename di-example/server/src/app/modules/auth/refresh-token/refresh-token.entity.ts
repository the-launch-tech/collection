import { Entity, Column, Unique, OneToOne } from 'typeorm';
import { IsNotEmpty, IsJWT, IsOptional, IsNumber, ValidateNested } from 'class-validator';

import { BaseEntity } from '@base/base.entity';
import { UserEntity } from '../../user/user.entity';

@Entity('refresh-token')
@Unique(['token'])
export class RefreshTokenEntity extends BaseEntity {
    @OneToOne((type) => UserEntity, { onDelete: 'CASCADE' })
    @IsNotEmpty()
    user!: UserEntity;

    @Column({
        name: 'token',
        type: 'varchar',
        default: null,
        nullable: false
    })
    @IsNotEmpty()
    @IsJWT()
    token!: string;

    @Column({
        name: 'length',
        type: 'int',
        default: null,
        nullable: true
    })
    @IsOptional()
    @IsNumber()
    length!: number;

    constructor(entity?: Partial<RefreshTokenEntity>) {
        super();

        Object.assign(this, entity);
    }
}
