import { injectable, inject } from 'inversify';

import { BaseService } from '@base/base.service';
import * as TYPES from '@app/app.types';
import { RefreshTokenDao } from '@refresh-token/refresh-token.dao';
import { RefreshTokenEntity } from '@refresh-token/refresh-token.entity';

@injectable()
export class RefreshTokenService extends BaseService<RefreshTokenEntity> {
    constructor(@inject(TYPES.RefreshTokenDao) private refreshTokenDao: RefreshTokenDao) {
        super(refreshTokenDao, RefreshTokenEntity);
    }
}
