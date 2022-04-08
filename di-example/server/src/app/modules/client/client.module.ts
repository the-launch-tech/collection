import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { ClientService } from './client.service';
import { ClientConverter } from './client.converter';
import { ClientEntity } from './client.entity';
import { ClientDao } from './client.dao';
import * as TYPES from '../../app.types';
import { Context } from '../base/base.controller';

export const ClientModule = new AsyncContainerModule(async (bind) => {
    await require('./client.controller');

    bind<ClientDao>(TYPES.ClientDao).to(ClientDao).inRequestScope();
    bind<ClientService>(TYPES.ClientService).to(ClientService).inRequestScope();
    bind<ClientConverter>(TYPES.ClientConverter).to(ClientConverter).inRequestScope();

    bind<Repository<ClientEntity>>(TYPES.ClientRepository)
        .toDynamicValue(
            (): Repository<ClientEntity> => ClientDao.getRepository<ClientEntity>(ClientEntity, {} as Context)
        )
        .inRequestScope();
});
