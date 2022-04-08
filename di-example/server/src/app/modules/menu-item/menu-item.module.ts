import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { MenuItemService } from './menu-item.service';
import { MenuItemConverter } from './menu-item.converter';
import { MenuItemEntity } from './menu-item.entity';
import { MenuItemDao } from './menu-item.dao';
import * as TYPES from '../../app.types';
import { Context } from '../base/base.controller';

export const MenuItemModule = new AsyncContainerModule(async (bind) => {
    await require('./menu-item.controller');

    bind<MenuItemDao>(TYPES.MenuItemDao).to(MenuItemDao).inRequestScope();
    bind<MenuItemService>(TYPES.MenuItemService).to(MenuItemService).inRequestScope();
    bind<MenuItemConverter>(TYPES.MenuItemConverter).to(MenuItemConverter).inRequestScope();

    bind<Repository<MenuItemEntity>>(TYPES.MenuItemRepository)
        .toDynamicValue(
            (): Repository<MenuItemEntity> => MenuItemDao.getRepository<MenuItemEntity>(MenuItemEntity, {} as Context)
        )
        .inRequestScope();
});
