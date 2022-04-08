import { controller } from 'inversify-express-utils';
import { inject } from 'inversify';

import { MenuItemDTO } from '@menu-item/menu-item.dto';
import * as TYPES from '../../app.types';
import { MenuItemService } from './menu-item.service';
import { MenuItemEntity } from './menu-item.entity';
import { MenuItemConverter } from './menu-item.converter';
import { BaseController } from '../base/base.controller';

@controller('/menu-items', TYPES.CheckJWT)
export class MenuItemController extends BaseController<MenuItemEntity, MenuItemDTO> {
    constructor(
        @inject(TYPES.MenuItemService) private menuItemService: MenuItemService,
        @inject(TYPES.MenuItemConverter) private menuItemConverter: MenuItemConverter
    ) {
        super(menuItemService, menuItemConverter, MenuItemEntity, MenuItemDTO);
    }
}
