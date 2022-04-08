import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { CategoryService } from './category.service';
import { CategoryConverter } from './category.converter';
import { CategoryEntity } from './category.entity';
import { CategoryDao } from './category.dao';
import * as TYPES from '../../app.types';
import { Context } from '../base/base.controller';

export const CategoryModule = new AsyncContainerModule(async (bind) => {
    await require('./category.controller');

    bind<CategoryDao>(TYPES.CategoryDao).to(CategoryDao).inRequestScope();
    bind<CategoryService>(TYPES.CategoryService).to(CategoryService).inRequestScope();
    bind<CategoryConverter>(TYPES.CategoryConverter).to(CategoryConverter).inRequestScope();

    bind<Repository<CategoryEntity>>(TYPES.CategoryRepository)
        .toDynamicValue(
            (): Repository<CategoryEntity> => CategoryDao.getRepository<CategoryEntity>(CategoryEntity, {} as Context)
        )
        .inRequestScope();
});
