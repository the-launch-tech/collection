import { inject, injectable } from 'inversify';

import * as TYPES from '@app/app.types';
import { BaseDao } from '../base/base.dao';
import { ComponentTypeConverter } from './component-type.converter';
import { ComponentTypeEntity } from './component-type.entity';

@injectable()
export class ComponentTypeDao extends BaseDao<ComponentTypeEntity> {
    constructor(@inject(TYPES.ComponentTypeConverter) private componentTypeConverter: ComponentTypeConverter) {
        super(componentTypeConverter, ComponentTypeEntity, ['project']);
    }
}
