import { injectable, inject } from 'inversify';

import { BaseService } from '@base/base.service';
import * as TYPES from '@app/app.types';
import { ActionEventDao } from '@action-event/action-event.dao';
import { ActionEventEntity } from '@action-event/action-event.entity';

@injectable()
export class ActionEventService extends BaseService<ActionEventEntity> {
    constructor(@inject(TYPES.ActionEventDao) private actionEventDao: ActionEventDao) {
        super(actionEventDao, ActionEventEntity);
    }
}
