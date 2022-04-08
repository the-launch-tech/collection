import { controller } from 'inversify-express-utils';
import { inject } from 'inversify';

import { ComponentTypeDTO } from '@component-type/component-type.dto';
import * as TYPES from '../../app.types';
import { ComponentTypeService } from './component-type.service';
import { ComponentTypeEntity } from './component-type.entity';
import { ComponentTypeConverter } from './component-type.converter';
import { BaseController } from '../base/base.controller';

@controller('/component-types', TYPES.CheckJWT)
export class ComponentTypeController extends BaseController<ComponentTypeEntity, ComponentTypeDTO> {
    constructor(
        @inject(TYPES.ComponentTypeService) private componentTypeService: ComponentTypeService,
        @inject(TYPES.ComponentTypeConverter) private componentTypeConverter: ComponentTypeConverter
    ) {
        super(componentTypeService, componentTypeConverter, ComponentTypeEntity, ComponentTypeDTO);
    }
}
