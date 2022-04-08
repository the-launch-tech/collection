import { injectable, inject } from 'inversify';
import { FindOneOptions, FindManyOptions } from 'typeorm';

import { BaseService } from '../base/base.service';
import * as TYPES from '../../app.types';
import { UserDao } from './user.dao';
import { UserEntity } from './user.entity';
import { Context } from '../base/base.controller';
import { UserRole } from './user.dto';

@injectable()
export class UserService extends BaseService<UserEntity> {
    constructor(@inject(TYPES.UserDao) private userDao: UserDao) {
        super(userDao, UserEntity);
    }

    public async findExistingUser(
        partial: { username: string; email: string },
        context: Context
    ): Promise<UserEntity | undefined> {
        const userEntity: UserEntity | undefined = await this.findByUsername(partial.username, context);

        if (userEntity) {
            return userEntity;
        }

        return await this.findByEmail(partial.email, context);
    }

    public async findByUsername(username: string, context: Context): Promise<UserEntity | undefined> {
        const findOneOptions: FindOneOptions<UserEntity> = {
            where: { username: username }
        };

        return await this.findOne(findOneOptions, context);
    }

    public async findByEmail(email: string, context: Context): Promise<UserEntity | undefined> {
        const findOneOptions: FindOneOptions<UserEntity> = {
            where: { email }
        };

        return await this.findOne(findOneOptions, context);
    }
}
