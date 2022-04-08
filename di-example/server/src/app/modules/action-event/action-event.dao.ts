import { inject, injectable } from 'inversify';

import * as TYPES from '@app/app.types';
import { BaseDao } from '@base/base.dao';
import { ActionEventEntity } from '@action-event/action-event.entity';
import { ActionEventConverter } from '@action-event/action-event.converter';

@injectable()
export class ActionEventDao extends BaseDao<ActionEventEntity> {
    constructor(@inject(TYPES.ActionEventConverter) private actionEventConverter: ActionEventConverter) {
        super(actionEventConverter, ActionEventEntity, ['user', 'project', 'account']);
    }
}
