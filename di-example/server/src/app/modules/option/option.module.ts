import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { OptionService } from './option.service';
import { OptionConverter } from './option.converter';
import { OptionEntity } from './option.entity';
import { OptionDao } from './option.dao';
import * as TYPES from '../../app.types';
import { Context } from '../base/base.controller';

export const OptionModule = new AsyncContainerModule(async (bind) => {
    await require('./option.controller');

    bind<OptionDao>(TYPES.OptionDao).to(OptionDao).inRequestScope();
    bind<OptionService>(TYPES.OptionService).to(OptionService).inRequestScope();
    bind<OptionConverter>(TYPES.OptionConverter).to(OptionConverter).inRequestScope();

    bind<Repository<OptionEntity>>(TYPES.OptionRepository)
        .toDynamicValue(
            (): Repository<OptionEntity> => OptionDao.getRepository<OptionEntity>(OptionEntity, {} as Context)
        )
        .inRequestScope();
});
