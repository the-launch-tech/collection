import { injectable, inject } from 'inversify';

import { BaseService } from '../base/base.service';
import * as TYPES from '../../app.types';
import { CategoryDao } from './category.dao';
import { CategoryEntity } from './category.entity';

@injectable()
export class CategoryService extends BaseService<CategoryEntity> {
    constructor(@inject(TYPES.CategoryDao) private categoryDao: CategoryDao) {
        super(categoryDao, CategoryEntity);
    }
}
