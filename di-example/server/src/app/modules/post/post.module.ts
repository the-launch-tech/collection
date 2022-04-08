import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { PostService } from './post.service';
import { PostConverter } from './post.converter';
import { PostEntity } from './post.entity';
import { PostDao } from './post.dao';
import * as TYPES from '../../app.types';
import { Context } from '../base/base.controller';

export const PostModule = new AsyncContainerModule(async (bind) => {
    await require('./post.controller');

    bind<PostDao>(TYPES.PostDao).to(PostDao).inRequestScope();
    bind<PostService>(TYPES.PostService).to(PostService).inRequestScope();
    bind<PostConverter>(TYPES.PostConverter).to(PostConverter).inRequestScope();

    bind<Repository<PostEntity>>(TYPES.PostRepository)
        .toDynamicValue((): Repository<PostEntity> => PostDao.getRepository<PostEntity>(PostEntity, {} as Context))
        .inRequestScope();
});
