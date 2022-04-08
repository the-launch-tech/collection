import { AsyncContainerModule } from 'inversify';

import { AuthService } from '@auth/auth.service';
import { AuthConverter } from '@auth/auth.converter';
import * as TYPES from '@app/app.types';

export const AuthModule: AsyncContainerModule = new AsyncContainerModule(async (bind) => {
    await require('./auth.controller');

    bind<AuthService>(TYPES.AuthService).to(AuthService).inRequestScope();
    bind<AuthConverter>(TYPES.AuthConverter).to(AuthConverter).inRequestScope();
});
