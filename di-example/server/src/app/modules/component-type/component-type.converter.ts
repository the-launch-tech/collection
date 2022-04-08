import { injectable } from 'inversify';

import { BaseConverter } from '../base/base.converter';
import { ComponentTypeEntity } from './component-type.entity';

@injectable()
export class ComponentTypeConverter extends BaseConverter<ComponentTypeEntity> {
    constructor() {
        super(ComponentTypeEntity);
    }
}
