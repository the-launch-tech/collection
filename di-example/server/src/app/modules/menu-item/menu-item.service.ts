import { injectable, inject } from 'inversify';

import { BaseService } from '../base/base.service';
import * as TYPES from '../../app.types';
import { MenuItemDao } from './menu-item.dao';
import { MenuItemEntity } from './menu-item.entity';

@injectable()
export class MenuItemService extends BaseService<MenuItemEntity> {
    constructor(@inject(TYPES.MenuItemDao) private menuItemDao: MenuItemDao) {
        super(menuItemDao, MenuItemEntity);
    }
}
