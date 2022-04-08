import { controller } from 'inversify-express-utils';
import { inject } from 'inversify';

import { AppProfileDTO } from '@app-profile/app-profile.dto';
import * as TYPES from '@app/app.types';
import { AppProfileService } from '@app-profile/app-profile.service';
import { AppProfileEntity } from '@app-profile/app-profile.entity';
import { AppProfileConverter } from '@app-profile/app-profile.converter';
import { BaseController } from '@base/base.controller';

@controller('/app-profiles', TYPES.CheckJWT)
export class AppProfileController extends BaseController<AppProfileEntity, AppProfileDTO> {
    constructor(
        @inject(TYPES.AppProfileService) private appProfileService: AppProfileService,
        @inject(TYPES.AppProfileConverter) private appProfileConverter: AppProfileConverter
    ) {
        super(appProfileService, appProfileConverter, AppProfileEntity, AppProfileDTO);
    }
}
