import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { RefreshTokenService } from '@refresh-token/refresh-token.service';
import { RefreshTokenConverter } from '@refresh-token/refresh-token.converter';
import { RefreshTokenEntity } from '@refresh-token/refresh-token.entity';
import { RefreshTokenDao } from '@refresh-token/refresh-token.dao';
import * as TYPES from '@app/app.types';
import { Context } from '@base/base.controller';

export const RefreshTokenModule = new AsyncContainerModule(async (bind) => {
    bind<RefreshTokenDao>(TYPES.RefreshTokenDao).to(RefreshTokenDao).inRequestScope();
    bind<RefreshTokenService>(TYPES.RefreshTokenService).to(RefreshTokenService).inRequestScope();
    bind<RefreshTokenConverter>(TYPES.RefreshTokenConverter).to(RefreshTokenConverter).inRequestScope();

    bind<Repository<RefreshTokenEntity>>(TYPES.RefreshTokenRepository)
        .toDynamicValue(
            (): Repository<RefreshTokenEntity> =>
                RefreshTokenDao.getRepository<RefreshTokenEntity>(RefreshTokenEntity, {} as Context)
        )
        .inRequestScope();
});
