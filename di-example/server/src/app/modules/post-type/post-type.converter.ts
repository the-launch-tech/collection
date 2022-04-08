import { injectable } from 'inversify';

import { BaseConverter } from '../base/base.converter';
import { PostTypeEntity } from './post-type.entity';

@injectable()
export class PostTypeConverter extends BaseConverter<PostTypeEntity> {
    constructor() {
        super(PostTypeEntity);
    }
}
