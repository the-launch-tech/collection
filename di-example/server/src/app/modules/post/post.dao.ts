import { inject, injectable } from 'inversify';

import * as TYPES from '@app/app.types';
import { BaseDao } from '../base/base.dao';
import { PostConverter } from './post.converter';
import { PostEntity } from './post.entity';

@injectable()
export class PostDao extends BaseDao<PostEntity> {
    constructor(@inject(TYPES.PostConverter) private postConverter: PostConverter) {
        super(postConverter, PostEntity, ['project', 'postType', 'categories']);
    }
}
