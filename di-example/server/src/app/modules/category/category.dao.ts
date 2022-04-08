import { inject, injectable } from 'inversify';

import * as TYPES from '@app/app.types';
import { BaseDao } from '@base/base.dao';
import { CategoryEntity } from '@category/category.entity';
import { CategoryConverter } from '@category/category.converter';

@injectable()
export class CategoryDao extends BaseDao<CategoryEntity> {
    constructor(@inject(TYPES.CategoryConverter) private categoryConverter: CategoryConverter) {
        super(categoryConverter, CategoryEntity, ['project', 'parent', 'children', 'posts']);
    }
}
