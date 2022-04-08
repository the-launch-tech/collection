import { inject, injectable } from 'inversify';

import * as TYPES from '@app/app.types';
import { BaseDao } from '../base/base.dao';
import { PostTypeConverter } from './post-type.converter';
import { PostTypeEntity } from './post-type.entity';

@injectable()
export class PostTypeDao extends BaseDao<PostTypeEntity> {
    constructor(@inject(TYPES.PostTypeConverter) private postTypeConverter: PostTypeConverter) {
        super(postTypeConverter, PostTypeEntity, ['project']);
    }
}
