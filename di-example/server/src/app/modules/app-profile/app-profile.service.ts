import { injectable, inject } from 'inversify';

import { BaseService } from '@base/base.service';
import * as TYPES from '@app/app.types';
import { AppProfileDao } from '@app-profile/app-profile.dao';
import { AppProfileEntity } from '@app-profile/app-profile.entity';

@injectable()
export class AppProfileService extends BaseService<AppProfileEntity> {
    constructor(@inject(TYPES.AppProfileDao) private appProfileDao: AppProfileDao) {
        super(appProfileDao, AppProfileEntity);
    }
}
