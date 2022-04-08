import { controller } from 'inversify-express-utils';
import { inject } from 'inversify';

import { CategoryDTO } from '@category/category.dto';
import * as TYPES from '@app/app.types';
import { CategoryService } from '@category/category.service';
import { CategoryEntity } from '@category/category.entity';
import { CategoryConverter } from '@category/category.converter';
import { BaseController } from '@base/base.controller';

@controller('/categories', TYPES.CheckJWT)
export class CategoryController extends BaseController<CategoryEntity, CategoryDTO> {
    constructor(
        @inject(TYPES.CategoryService) private categoryService: CategoryService,
        @inject(TYPES.CategoryConverter) private categoryConverter: CategoryConverter
    ) {
        super(categoryService, categoryConverter, CategoryEntity, CategoryDTO);
    }
}
