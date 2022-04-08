import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { UserService } from './user.service';
import { UserConverter } from './user.converter';
import { UserEntity } from './user.entity';
import { UserDao } from './user.dao';
import * as TYPES from '../../app.types';
import { Context } from '../base/base.controller';

export const UserModule = new AsyncContainerModule(async (bind) => {
    await require('./user.controller');

    bind<UserDao>(TYPES.UserDao).to(UserDao).inRequestScope();
    bind<UserService>(TYPES.UserService).to(UserService).inRequestScope();
    bind<UserConverter>(TYPES.UserConverter).to(UserConverter).inRequestScope();

    bind<Repository<UserEntity>>(TYPES.UserRepository)
        .toDynamicValue((): Repository<UserEntity> => UserDao.getRepository<UserEntity>(UserEntity, {} as Context))
        .inRequestScope();
});
