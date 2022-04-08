import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { ActionEventService } from '@action-event/action-event.service';
import { ActionEventConverter } from '@action-event/action-event.converter';
import { ActionEventEntity } from '@action-event/action-event.entity';
import { ActionEventDao } from '@action-event/action-event.dao';
import * as TYPES from '@app/app.types';
import { Context } from '@base/base.controller';

export const ActionEventModule = new AsyncContainerModule(async (bind) => {
    await require('./action-event.controller');

    bind<ActionEventDao>(TYPES.ActionEventDao).to(ActionEventDao).inRequestScope();
    bind<ActionEventService>(TYPES.ActionEventService).to(ActionEventService).inRequestScope();
    bind<ActionEventConverter>(TYPES.ActionEventConverter).to(ActionEventConverter).inRequestScope();

    bind<Repository<ActionEventEntity>>(TYPES.ActionEventRepository)
        .toDynamicValue(
            (): Repository<ActionEventEntity> =>
                ActionEventDao.getRepository<ActionEventEntity>(ActionEventEntity, {} as Context)
        )
        .inRequestScope();
});
