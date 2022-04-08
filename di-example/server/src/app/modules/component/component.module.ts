import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { ComponentService } from './component.service';
import { ComponentConverter } from './component.converter';
import { ComponentEntity } from './component.entity';
import { ComponentDao } from './component.dao';
import * as TYPES from '../../app.types';
import { Context } from '../base/base.controller';

export const ComponentModule = new AsyncContainerModule(async (bind) => {
    await require('./component.controller');

    bind<ComponentDao>(TYPES.ComponentDao).to(ComponentDao).inRequestScope();
    bind<ComponentService>(TYPES.ComponentService).to(ComponentService).inRequestScope();
    bind<ComponentConverter>(TYPES.ComponentConverter).to(ComponentConverter).inRequestScope();

    bind<Repository<ComponentEntity>>(TYPES.ComponentRepository)
        .toDynamicValue(
            (): Repository<ComponentEntity> =>
                ComponentDao.getRepository<ComponentEntity>(ComponentEntity, {} as Context)
        )
        .inRequestScope();
});
