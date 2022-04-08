import { injectable } from 'inversify';

import { BaseConverter } from '../base/base.converter';
import { AccountEntity } from './account.entity';

@injectable()
export class AccountConverter extends BaseConverter<AccountEntity> {
    constructor() {
        super(AccountEntity);
    }
}
