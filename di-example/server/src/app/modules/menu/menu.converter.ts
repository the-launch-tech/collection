import { injectable } from 'inversify';

import { BaseConverter } from '../base/base.converter';
import { MenuEntity } from './menu.entity';

@injectable()
export class MenuConverter extends BaseConverter<MenuEntity> {
    constructor() {
        super(MenuEntity);
    }
}
