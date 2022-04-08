import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { MenuService } from './menu.service';
import { MenuConverter } from './menu.converter';
import { MenuEntity } from './menu.entity';
import { MenuDao } from './menu.dao';
import * as TYPES from '../../app.types';
import { Context } from '../base/base.controller';

export const MenuModule = new AsyncContainerModule(async (bind) => {
    await require('./menu.controller');

    bind<MenuDao>(TYPES.MenuDao).to(MenuDao).inRequestScope();
    bind<MenuService>(TYPES.MenuService).to(MenuService).inRequestScope();
    bind<MenuConverter>(TYPES.MenuConverter).to(MenuConverter).inRequestScope();

    bind<Repository<MenuEntity>>(TYPES.MenuRepository)
        .toDynamicValue((): Repository<MenuEntity> => MenuDao.getRepository<MenuEntity>(MenuEntity, {} as Context))
        .inRequestScope();
});
