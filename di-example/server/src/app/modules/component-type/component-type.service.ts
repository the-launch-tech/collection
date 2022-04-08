import { injectable, inject } from 'inversify';

import { BaseService } from '../base/base.service';
import * as TYPES from '../../app.types';
import { ComponentTypeDao } from './component-type.dao';
import { ComponentTypeEntity } from './component-type.entity';

@injectable()
export class ComponentTypeService extends BaseService<ComponentTypeEntity> {
    constructor(@inject(TYPES.ComponentTypeDao) private componentTypeDao: ComponentTypeDao) {
        super(componentTypeDao, ComponentTypeEntity);
    }
}
