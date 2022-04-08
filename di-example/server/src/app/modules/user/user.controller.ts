import { controller, httpPost, requestBody } from 'inversify-express-utils';
import { inject } from 'inversify';

import { UserDTO } from '@user/user.dto';
import * as TYPES from '../../app.types';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserConverter } from './user.converter';
import { BaseController, Context } from '../base/base.controller';
import { CreateUserDTOBody, CreateUserDTO } from '@user/user.dto';
import * as MIDDLEWARE from '@middleware/index';
import { JsonResult } from 'inversify-express-utils/lib/results';
import { AccountEntity } from '../account/account.entity';
import { AccountService } from '../account/account.service';
import * as jwt from 'jsonwebtoken';
import { ProjectEntity } from '../project/project.entity';
import { ProjectService } from '../project/project.service';

@controller('/users', TYPES.CheckJWT)
export class UserController extends BaseController<UserEntity, UserDTO> {
    static EXISTING_USER = 'User already exists with that username or email!';
    static NO_EXISTING_ACCOUNT = 'Unable to associate user with account!';
    static COULD_NOT_FIND_PROJECT = 'Could not find desired project to set as default!';

    constructor(
        @inject(TYPES.UserService) private userService: UserService,
        @inject(TYPES.UserConverter) private userConverter: UserConverter,
        @inject(TYPES.AccountService) private accountService: AccountService,
        @inject(TYPES.ProjectService) private projectService: ProjectService
    ) {
        super(userService, userConverter, UserEntity, UserDTO);
    }

    @httpPost('/create', MIDDLEWARE.ValidateRequestObject<CreateUserDTO>(CreateUserDTO))
    public async createInternally(@requestBody() body: CreateUserDTOBody): Promise<JsonResult | UserDTO> {
        const context: Context = this.context();

        console.log('createInternally: body: ', body);

        const existingUser: UserEntity | undefined = await this.userService.findExistingUser(body, context);

        console.log('createInternally: existingUser: ', existingUser);

        if (existingUser) {
            return this.json(UserController.EXISTING_USER, 400);
        }

        const accountEntity: AccountEntity | undefined = await this.accountService.findByUid(body.accountUid, context);

        console.log('createInternally: accountEntity: ', accountEntity);

        if (!accountEntity) {
            return this.json(UserController.NO_EXISTING_ACCOUNT);
        }

        const projectEntity: ProjectEntity | undefined = await this.projectService.findByUid(body.projectUid, context);

        console.log('createInternally: projectEntity: ', projectEntity);

        if (!projectEntity) {
            return this.json(UserController.COULD_NOT_FIND_PROJECT);
        }

        const userEntity: UserEntity = await this.userService.createOne(
            new UserEntity({
                username: body.username,
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                role: body.role,
                account: accountEntity,
                defaultProject: projectEntity,
                passwordToken: jwt.sign(
                    { username: body.username, email: body.email },
                    process.env.JWT_PASSWORD_SECRET as string
                )
            }),
            context
        );

        console.log('createInternally: userEntity: ', userEntity);

        return await this.userConverter.toDTO<UserDTO>(userEntity, UserDTO, context);
    }
}
