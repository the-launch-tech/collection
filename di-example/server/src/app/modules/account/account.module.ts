import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { AccountService } from './account.service';
import { AccountConverter } from './account.converter';
import { AccountEntity } from './account.entity';
import { AccountDao } from './account.dao';
import * as TYPES from '../../app.types';
import { Context } from '../base/base.controller';

export const AccountModule = new AsyncContainerModule(async (bind) => {
    await require('./account.controller');

    bind<AccountDao>(TYPES.AccountDao).to(AccountDao).inRequestScope();
    bind<AccountService>(TYPES.AccountService).to(AccountService).inRequestScope();
    bind<AccountConverter>(TYPES.AccountConverter).to(AccountConverter).inRequestScope();

    bind<Repository<AccountEntity>>(TYPES.AccountRepository)
        .toDynamicValue(
            (): Repository<AccountEntity> => AccountDao.getRepository<AccountEntity>(AccountEntity, {} as Context)
        )
        .inRequestScope();
});
