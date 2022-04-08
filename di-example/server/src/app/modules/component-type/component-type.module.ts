import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { ComponentTypeService } from './component-type.service';
import { ComponentTypeConverter } from './component-type.converter';
import { ComponentTypeEntity } from './component-type.entity';
import { ComponentTypeDao } from './component-type.dao';
import * as TYPES from '../../app.types';
import { Context } from '../base/base.controller';

export const ComponentTypeModule = new AsyncContainerModule(async (bind) => {
    await require('./component-type.controller');

    bind<ComponentTypeDao>(TYPES.ComponentTypeDao).to(ComponentTypeDao).inRequestScope();
    bind<ComponentTypeService>(TYPES.ComponentTypeService).to(ComponentTypeService).inRequestScope();
    bind<ComponentTypeConverter>(TYPES.ComponentTypeConverter).to(ComponentTypeConverter).inRequestScope();

    bind<Repository<ComponentTypeEntity>>(TYPES.ComponentTypeRepository)
        .toDynamicValue(
            (): Repository<ComponentTypeEntity> =>
                ComponentTypeDao.getRepository<ComponentTypeEntity>(ComponentTypeEntity, {} as Context)
        )
        .inRequestScope();
});
