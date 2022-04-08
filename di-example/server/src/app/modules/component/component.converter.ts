import { injectable } from 'inversify';

import { BaseConverter } from '../base/base.converter';
import { ComponentEntity } from './component.entity';

@injectable()
export class ComponentConverter extends BaseConverter<ComponentEntity> {
    constructor() {
        super(ComponentEntity);
    }
}
