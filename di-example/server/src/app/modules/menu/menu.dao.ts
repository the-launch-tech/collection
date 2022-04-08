import { inject, injectable } from 'inversify';

import * as TYPES from '@app/app.types';
import { BaseDao } from '../base/base.dao';
import { MenuConverter } from './menu.converter';
import { MenuEntity } from './menu.entity';

@injectable()
export class MenuDao extends BaseDao<MenuEntity> {
    constructor(@inject(TYPES.MenuConverter) private menuConverter: MenuConverter) {
        super(menuConverter, MenuEntity, ['project', 'menuItems']);
    }
}
