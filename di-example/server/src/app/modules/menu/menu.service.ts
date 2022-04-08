import { injectable, inject } from 'inversify';

import { BaseService } from '../base/base.service';
import * as TYPES from '../../app.types';
import { MenuDao } from './menu.dao';
import { MenuEntity } from './menu.entity';

@injectable()
export class MenuService extends BaseService<MenuEntity> {
    constructor(@inject(TYPES.MenuDao) private menuDao: MenuDao) {
        super(menuDao, MenuEntity);
    }
}
