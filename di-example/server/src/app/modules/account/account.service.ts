import { injectable, inject } from 'inversify';

import { BaseService } from '../base/base.service';
import * as TYPES from '../../app.types';
import { AccountDao } from './account.dao';
import { AccountEntity } from './account.entity';

@injectable()
export class AccountService extends BaseService<AccountEntity> {
    constructor(@inject(TYPES.AccountDao) private accountDao: AccountDao) {
        super(accountDao, AccountEntity);
    }
}
