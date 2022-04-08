import { controller } from 'inversify-express-utils';
import { inject } from 'inversify';

import { PostTypeDTO } from '@post-type/post-type.dto';
import * as TYPES from '../../app.types';
import { PostTypeService } from './post-type.service';
import { PostTypeEntity } from './post-type.entity';
import { PostTypeConverter } from './post-type.converter';
import { BaseController } from '../base/base.controller';

@controller('/post-types', TYPES.CheckJWT)
export class PostTypeController extends BaseController<PostTypeEntity, PostTypeDTO> {
    constructor(
        @inject(TYPES.PostTypeService) private postTypeService: PostTypeService,
        @inject(TYPES.PostTypeConverter) private postTypeConverter: PostTypeConverter
    ) {
        super(postTypeService, postTypeConverter, PostTypeEntity, PostTypeDTO);
    }
}
