import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { AppProfileService } from '@app-profile/app-profile.service';
import { AppProfileConverter } from '@app-profile/app-profile.converter';
import { AppProfileEntity } from '@app-profile/app-profile.entity';
import { AppProfileDao } from '@app-profile/app-profile.dao';
import * as TYPES from '@app/app.types';
import { Context } from '@base/base.controller';

export const AppProfileModule = new AsyncContainerModule(async (bind) => {
    await require('./app-profile.controller');

    bind<AppProfileDao>(TYPES.AppProfileDao).to(AppProfileDao).inRequestScope();
    bind<AppProfileService>(TYPES.AppProfileService).to(AppProfileService).inRequestScope();
    bind<AppProfileConverter>(TYPES.AppProfileConverter).to(AppProfileConverter).inRequestScope();

    bind<Repository<AppProfileEntity>>(TYPES.AppProfileRepository)
        .toDynamicValue(
            (): Repository<AppProfileEntity> =>
                AppProfileDao.getRepository<AppProfileEntity>(AppProfileEntity, {} as Context)
        )
        .inRequestScope();
});
