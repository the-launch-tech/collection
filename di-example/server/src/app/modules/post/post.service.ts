import { injectable, inject } from 'inversify';

import { BaseService } from '../base/base.service';
import * as TYPES from '../../app.types';
import { PostDao } from './post.dao';
import { PostEntity } from './post.entity';

@injectable()
export class PostService extends BaseService<PostEntity> {
    constructor(@inject(TYPES.PostDao) private postDao: PostDao) {
        super(postDao, PostEntity);
    }
}
