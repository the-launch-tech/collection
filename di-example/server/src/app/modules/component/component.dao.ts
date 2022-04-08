import { inject, injectable } from 'inversify';

import * as TYPES from '@app/app.types';
import { BaseDao } from '../base/base.dao';
import { ComponentConverter } from './component.converter';
import { ComponentEntity } from './component.entity';

@injectable()
export class ComponentDao extends BaseDao<ComponentEntity> {
    constructor(@inject(TYPES.ComponentConverter) private componentConverter: ComponentConverter) {
        super(componentConverter, ComponentEntity, ['parent', 'children', 'project', 'componentType']);
    }
}
