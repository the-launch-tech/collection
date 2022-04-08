import { injectable } from 'inversify';

import { BaseConverter } from '@base/base.converter';
import { ActionEventEntity } from '@action-event/action-event.entity';

@injectable()
export class ActionEventConverter extends BaseConverter<ActionEventEntity> {
    constructor() {
        super(ActionEventEntity);
    }
}
