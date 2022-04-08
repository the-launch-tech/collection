import { inject, injectable } from 'inversify';

import * as TYPES from '@app/app.types';
import { BaseDao } from '@base/base.dao';
import { AppProfileEntity } from '@app-profile/app-profile.entity';
import { AppProfileConverter } from '@app-profile/app-profile.converter';

@injectable()
export class AppProfileDao extends BaseDao<AppProfileEntity> {
    constructor(@inject(TYPES.AppProfileConverter) private appProfileConverter: AppProfileConverter) {
        super(appProfileConverter, AppProfileEntity, ['user', 'project', 'account']);
    }
}
