import { injectable } from 'inversify';

import { BaseConverter } from '../base/base.converter';
import { PostEntity } from './post.entity';

@injectable()
export class PostConverter extends BaseConverter<PostEntity> {
    constructor() {
        super(PostEntity);
    }
}
