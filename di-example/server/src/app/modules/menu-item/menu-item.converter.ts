import { injectable } from 'inversify';

import { BaseConverter } from '../base/base.converter';
import { MenuItemEntity } from './menu-item.entity';

@injectable()
export class MenuItemConverter extends BaseConverter<MenuItemEntity> {
    constructor() {
        super(MenuItemEntity);
    }
}
