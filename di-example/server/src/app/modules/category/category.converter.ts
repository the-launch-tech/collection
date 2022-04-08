import { injectable } from 'inversify';

import { BaseConverter } from '../base/base.converter';
import { CategoryEntity } from './category.entity';

@injectable()
export class CategoryConverter extends BaseConverter<CategoryEntity> {
    constructor() {
        super(CategoryEntity);
    }
}
