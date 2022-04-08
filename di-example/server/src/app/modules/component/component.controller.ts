import { controller } from 'inversify-express-utils';
import { inject } from 'inversify';

import { ComponentDTO } from '@component/component.dto';
import * as TYPES from '../../app.types';
import { ComponentService } from './component.service';
import { ComponentEntity } from './component.entity';
import { ComponentConverter } from './component.converter';
import { BaseController } from '../base/base.controller';

@controller('/components', TYPES.CheckJWT)
export class ComponentController extends BaseController<ComponentEntity, ComponentDTO> {
    constructor(
        @inject(TYPES.ComponentService) private componentService: ComponentService,
        @inject(TYPES.ComponentConverter) private componentConverter: ComponentConverter
    ) {
        super(componentService, componentConverter, ComponentEntity, ComponentDTO);
    }
}
