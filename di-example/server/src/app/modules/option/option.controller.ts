import { controller } from 'inversify-express-utils';
import { inject } from 'inversify';

import { OptionDTO } from '@option/option.dto';
import * as TYPES from '../../app.types';
import { OptionService } from './option.service';
import { OptionEntity } from './option.entity';
import { OptionConverter } from './option.converter';
import { BaseController } from '../base/base.controller';

@controller('/options', TYPES.CheckJWT)
export class OptionController extends BaseController<OptionEntity, OptionDTO> {
    constructor(
        @inject(TYPES.OptionService) private optionService: OptionService,
        @inject(TYPES.OptionConverter) private optionConverter: OptionConverter
    ) {
        super(optionService, optionConverter, OptionEntity, OptionDTO);
    }
}
