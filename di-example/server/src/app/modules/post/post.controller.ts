import { controller } from 'inversify-express-utils';
import { inject } from 'inversify';

import { PostDTO } from '@post/post.dto';
import * as TYPES from '../../app.types';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { PostConverter } from './post.converter';
import { BaseController } from '../base/base.controller';

@controller('/posts', TYPES.CheckJWT)
export class PostController extends BaseController<PostEntity, PostDTO> {
    constructor(
        @inject(TYPES.PostService) private postService: PostService,
        @inject(TYPES.PostConverter) private postConverter: PostConverter
    ) {
        super(postService, postConverter, PostEntity, PostDTO);
    }
}
