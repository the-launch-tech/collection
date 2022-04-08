import { inject, injectable } from 'inversify';

import * as TYPES from '@app/app.types';
import { BaseDao } from '@base/base.dao';
import { UserEntity } from '@user/user.entity';
import { UserConverter } from './user.converter';

@injectable()
export class UserDao extends BaseDao<UserEntity> {
    constructor(@inject(TYPES.UserConverter) private userConverter: UserConverter) {
        super(userConverter, UserEntity, ['account', 'defaultProject', 'projects']);
    }
}
