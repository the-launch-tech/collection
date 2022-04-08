import { injectable, inject } from 'inversify';

import { BaseService } from '../base/base.service';
import * as TYPES from '../../app.types';
import { OptionDao } from './option.dao';
import { OptionEntity } from './option.entity';

@injectable()
export class OptionService extends BaseService<OptionEntity> {
    constructor(@inject(TYPES.OptionDao) private optionDao: OptionDao) {
        super(optionDao, OptionEntity);
    }
}
