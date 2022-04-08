import { injectable, inject } from 'inversify';

import { BaseService } from '../base/base.service';
import * as TYPES from '../../app.types';
import { PostTypeDao } from './post-type.dao';
import { PostTypeEntity } from './post-type.entity';

@injectable()
export class PostTypeService extends BaseService<PostTypeEntity> {
    constructor(@inject(TYPES.PostTypeDao) private postTypeDao: PostTypeDao) {
        super(postTypeDao, PostTypeEntity);
    }
}
