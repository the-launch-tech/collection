import { injectable } from 'inversify';
import * as jwt from 'jsonwebtoken';

import { ClientPermissions, ResetJwtDTO, AuthJwtDTO } from '@auth/auth.dto';
import { UserEntity } from '@user/user.entity';
import { Context } from '@base/base.controller';

@injectable()
export class AuthConverter {
    public async toAuthJwt(entity: UserEntity, context: Context): Promise<AuthJwtDTO> {
        const token: string = jwt.sign(
            { uid: entity.uid, username: entity.username },
            process.env.JWT_USER_SECRET as string,
            { expiresIn: process.env.JWT_USER_EXP as string }
        );

        console.log('toAuthJwt: token: ', token);

        const refreshToken: string = jwt.sign(
            { uid: entity.uid, username: entity.username },
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: process.env.JWT_REFRESH_EXP }
        );

        console.log('toAuthJwt: refreshToken: ', refreshToken);

        return {
            token,
            refreshToken
        };
    }

    public async toResetJwt(entity: UserEntity, context: Context): Promise<ResetJwtDTO & { expires: Date }> {
        const token: string = jwt.sign({ uid: entity.uid }, process.env.JWT_RESET_SECRET as string, {
            expiresIn: process.env.JWT_RESET_EXP as string
        });

        const expires = new Date();
        expires.setHours(expires.getHours() + 1);

        return {
            token,
            expires
        };
    }

    public async toClientJwt(slug: string, permissions: ClientPermissions, context: Context): Promise<string> {
        return jwt.sign({ slug, permissions }, process.env.JWT_CLIENT_SECRET as string);
    }
}
