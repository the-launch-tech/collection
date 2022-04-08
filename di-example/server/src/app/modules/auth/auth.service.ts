import * as jwt from 'jsonwebtoken';
import { inject, injectable } from 'inversify';
import * as bcrypt from 'bcryptjs';

import { UserEntity } from '@user/user.entity';
import { Context } from '@base/base.controller';
import * as TYPES from '@app/app.types';
import { UserService } from '@user/user.service';

@injectable()
export class AuthService {
    constructor(@inject(TYPES.UserService) private userService: UserService) {}

    public async findByToken(token: string, refreshToken: string, context: Context): Promise<UserEntity | undefined> {
        if (!token || token === 'undefined') {
            return undefined;
        }

        try {
            const jwtPayload: jwt.JwtPayload | string = jwt.verify(token, process.env.JWT_USER_SECRET as string);

            if (typeof jwtPayload === 'string') {
                throw new Error('Invalid Verification!');
            }

            return await this.userService.findByUid(jwtPayload.uid, context);
        } catch (e) {
            // try {
            //     const refreshJwtPayload: jwt.JwtPayload | string = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);

            //     console.log('refreshJwtPayload: ', refreshJwtPayload);

            //     if (typeof refreshJwtPayload === 'string') {
            //         throw new Error('Invalid Verification!');
            //     }

            //     return await this.userService.findByUid(refreshJwtPayload.uid, context);
            // } catch(e) {
            //     return undefined
            // }

            return undefined;
        }
    }

    public async createResetPasswordToken(entity: UserEntity, context: Context): Promise<string> {
        return '';
    }

    public async validateResetToken(token: string, entity: UserEntity, context: Context): Promise<boolean> {
        const jwtPayload: jwt.JwtPayload | string = jwt.verify(token, process.env.JWT_PASSWORD_RESET_SECRET as string);

        if (typeof jwtPayload === 'string') {
            return false;
        }

        if (jwtPayload.uid !== entity.uid) {
            return false;
        }

        return true;
    }

    public async hashPassword(password: string): Promise<string> {
        const salt: string = await bcrypt.genSalt(12);
        return await bcrypt.hash(password, salt);
    }

    public checkPassword(unencryptedPassword: string, password: string): boolean {
        return bcrypt.compareSync(unencryptedPassword, password);
    }
}
