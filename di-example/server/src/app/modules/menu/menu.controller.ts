import { controller } from 'inversify-express-utils';
import { inject } from 'inversify';

import { MenuDTO } from '@menu/menu.dto';
import * as TYPES from '../../app.types';
import { MenuService } from './menu.service';
import { MenuEntity } from './menu.entity';
import { MenuConverter } from './menu.converter';
import { BaseController } from '../base/base.controller';

@controller('/menus', TYPES.CheckJWT)
export class MenuController extends BaseController<MenuEntity, MenuDTO> {
    constructor(
        @inject(TYPES.MenuService) private menuService: MenuService,
        @inject(TYPES.MenuConverter) private menuConverter: MenuConverter
    ) {
        super(menuService, menuConverter, MenuEntity, MenuDTO);
    }
}
