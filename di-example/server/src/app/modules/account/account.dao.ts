import { inject, injectable } from 'inversify';

import * as TYPES from '@app/app.types';
import { BaseDao } from '../base/base.dao';
import { AccountEntity } from './account.entity';
import { AccountConverter } from '@account/account.converter';

@injectable()
export class AccountDao extends BaseDao<AccountEntity> {
    constructor(@inject(TYPES.AccountConverter) private accountConverter: AccountConverter) {
        super(accountConverter, AccountEntity, ['users', 'projects', 'clients']);
    }
}
