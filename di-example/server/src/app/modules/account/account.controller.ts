import { controller } from 'inversify-express-utils';
import { inject } from 'inversify';

import { AccountDTO } from '@account/account.dto';
import * as TYPES from '@app/app.types';
import { AccountService } from '@account/account.service';
import { AccountEntity } from '@account/account.entity';
import { AccountConverter } from '@account/account.converter';
import { BaseController } from '@base/base.controller';

@controller('/accounts', TYPES.CheckJWT)
export class AccountController extends BaseController<AccountEntity, AccountDTO> {
    constructor(
        @inject(TYPES.AccountService) private accountService: AccountService,
        @inject(TYPES.AccountConverter) private accountConverter: AccountConverter
    ) {
        super(accountService, accountConverter, AccountEntity, AccountDTO);
    }
}
