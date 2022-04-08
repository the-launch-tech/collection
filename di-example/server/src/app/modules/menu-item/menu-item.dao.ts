import { inject, injectable } from 'inversify';

import { BaseDao } from '../base/base.dao';
import { MenuItemConverter } from './menu-item.converter';
import { MenuItemEntity } from './menu-item.entity';
import * as TYPES from '@app/app.types';

@injectable()
export class MenuItemDao extends BaseDao<MenuItemEntity> {
    constructor(@inject(TYPES.MenuItemConverter) private menuItemConverter: MenuItemConverter) {
        super(menuItemConverter, MenuItemEntity, ['project', 'menu', 'parent', 'children']);
    }
}
