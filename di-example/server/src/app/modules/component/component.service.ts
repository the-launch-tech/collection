import { injectable, inject } from 'inversify';

import { BaseService } from '../base/base.service';
import * as TYPES from '../../app.types';
import { ComponentDao } from './component.dao';
import { ComponentEntity } from './component.entity';

@injectable()
export class ComponentService extends BaseService<ComponentEntity> {
    constructor(@inject(TYPES.ComponentDao) private componentDao: ComponentDao) {
        super(componentDao, ComponentEntity);
    }
}
