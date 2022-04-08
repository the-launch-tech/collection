import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import * as express from 'express';

@injectable()
export class CheckJWT extends BaseMiddleware {
    static USER_NOT_AUTHENTICATED = 'User Not Authenticated!';

    public async handler(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (!(await this.httpContext.user.isAuthenticated())) {
            return res.status(401).json(CheckJWT.USER_NOT_AUTHENTICATED);
        }

        next();
    }
}
