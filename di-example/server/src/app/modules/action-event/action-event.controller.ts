import { controller } from 'inversify-express-utils';
import { inject } from 'inversify';

import { ActionEventDTO } from '@action-event/action-event.dto';
import * as TYPES from '@app/app.types';
import { ActionEventService } from '@action-event/action-event.service';
import { ActionEventEntity } from '@action-event/action-event.entity';
import { ActionEventConverter } from '@action-event/action-event.converter';
import { BaseController } from '@base/base.controller';

@controller('/action-events', TYPES.CheckJWT)
export class ActionEventController extends BaseController<ActionEventEntity, ActionEventDTO> {
    constructor(
        @inject(TYPES.ActionEventService) private actionEventService: ActionEventService,
        @inject(TYPES.ActionEventConverter) private actionEventConverter: ActionEventConverter
    ) {
        super(actionEventService, actionEventConverter, ActionEventEntity, ActionEventDTO);
    }
}
