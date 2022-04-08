import { injectable } from 'inversify';

import { BaseConverter } from '@base/base.converter';
import { RefreshTokenEntity } from '@refresh-token/refresh-token.entity';

@injectable()
export class RefreshTokenConverter extends BaseConverter<RefreshTokenEntity> {
    constructor() {
        super(RefreshTokenEntity);
    }
}
