import { inject, injectable } from 'inversify';

import * as TYPES from '@app/app.types';
import { BaseDao } from '../base/base.dao';
import { OptionConverter } from './option.converter';
import { OptionEntity } from './option.entity';

@injectable()
export class OptionDao extends BaseDao<OptionEntity> {
    constructor(@inject(TYPES.OptionConverter) private optionConverter: OptionConverter) {
        super(optionConverter, OptionEntity, ['project']);
    }
}
