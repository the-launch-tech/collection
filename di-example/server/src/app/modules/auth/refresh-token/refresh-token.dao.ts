import { inject, injectable } from 'inversify';

import * as TYPES from '@app/app.types';
import { BaseDao } from '@base/base.dao';
import { RefreshTokenEntity } from '@refresh-token/refresh-token.entity';
import { RefreshTokenConverter } from '@refresh-token/refresh-token.converter';

@injectable()
export class RefreshTokenDao extends BaseDao<RefreshTokenEntity> {
    constructor(@inject(TYPES.RefreshTokenConverter) private refreshTokenConverter: RefreshTokenConverter) {
        super(refreshTokenConverter, RefreshTokenEntity, ['user']);
    }
}
