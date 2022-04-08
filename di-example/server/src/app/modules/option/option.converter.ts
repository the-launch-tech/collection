import { injectable } from 'inversify';

import { BaseConverter } from '../base/base.converter';
import { OptionEntity } from './option.entity';

@injectable()
export class OptionConverter extends BaseConverter<OptionEntity> {
    constructor() {
        super(OptionEntity);
    }
}
