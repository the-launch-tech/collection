import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { PostTypeService } from './post-type.service';
import { PostTypeConverter } from './post-type.converter';
import { PostTypeEntity } from './post-type.entity';
import { PostTypeDao } from './post-type.dao';
import * as TYPES from '../../app.types';
import { Context } from '../base/base.controller';

export const PostTypeModule = new AsyncContainerModule(async (bind) => {
    await require('./post-type.controller');

    bind<PostTypeDao>(TYPES.PostTypeDao).to(PostTypeDao).inRequestScope();
    bind<PostTypeService>(TYPES.PostTypeService).to(PostTypeService).inRequestScope();
    bind<PostTypeConverter>(TYPES.PostTypeConverter).to(PostTypeConverter).inRequestScope();

    bind<Repository<PostTypeEntity>>(TYPES.PostTypeRepository)
        .toDynamicValue(
            (): Repository<PostTypeEntity> => PostTypeDao.getRepository<PostTypeEntity>(PostTypeEntity, {} as Context)
        )
        .inRequestScope();
});
