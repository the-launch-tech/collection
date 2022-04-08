import { injectable, inject } from 'inversify';
import { interfaces } from 'inversify-express-utils';
import * as express from 'express';

import * as TYPES from '@app/app.types';
import { AuthService } from '@auth/auth.service';
import { UserEntity } from '@user/user.entity';
import { Context } from '@base/base.controller';

export class Principal implements interfaces.Principal {
    public details!: UserEntity | undefined;

    public constructor(details?: UserEntity) {
        this.details = details;
    }

    public isAuthenticated(): Promise<boolean> {
        return Promise.resolve(!!this.details?.uid);
    }

    public isResourceOwner(resourceId: string): Promise<boolean> {
        return Promise.resolve(resourceId === '1111');
    }

    public isInRole(...roles: string[]): Promise<boolean> {
        return Promise.resolve(roles.includes(this.details?.role as string));
    }
}

const authService = inject(TYPES.AuthService);

@injectable()
export class AuthProvider implements interfaces.AuthProvider {
    @authService private readonly authService!: AuthService;

    public async getUser(req: express.Request): Promise<interfaces.Principal> {
        const token: string = req.headers['x-auth-token'] as string;
        const refreshToken: string = req.headers['x-refresh-token'] as string;
        const user: UserEntity | undefined = await this.authService.findByToken(token, refreshToken, {} as Context);
        const principal: Principal = new Principal(user);
        return principal;
    }
}
