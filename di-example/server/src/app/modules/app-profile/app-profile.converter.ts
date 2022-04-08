import { injectable } from 'inversify';

import { BaseConverter } from '@base/base.converter';
import { AppProfileEntity } from '@app-profile/app-profile.entity';

@injectable()
export class AppProfileConverter extends BaseConverter<AppProfileEntity> {
    constructor() {
        super(AppProfileEntity);
    }
}
