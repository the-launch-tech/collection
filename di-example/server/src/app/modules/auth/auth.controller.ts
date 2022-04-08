import { controller, httpGet, httpPost, requestBody, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as bcrypt from 'bcryptjs';
import { JsonResult } from 'inversify-express-utils/lib/results';

import {
    RegisterAccountDTO,
    RegisterAccountDTOBody,
    RegisterUserDTO,
    RegisterUserDTOBody,
    LoginDTO,
    LoginDTOBody,
    ResetPasswordDTO,
    ResetPasswordDTOBody,
    ForgotPasswordDTO,
    ForgotPasswordDTOBody,
    RegisterClientDTO,
    RegisterClientDTOBody,
    AuthJwtDTO,
    ResetJwtDTO
} from '@auth/auth.dto';
import * as TYPES from '@app/app.types';
import * as MIDDLEWARE from '@middleware/index';
import { UserDTO, UserRole } from '@user/user.dto';
import { UserEntity } from '@user/user.entity';
import { UserService } from '@user/user.service';
import { UserConverter } from '@user/user.converter';
import { ClientDTO } from '@client/client.dto';
import { ClientService } from '@client/client.service';
import { ClientConverter } from '@client/client.converter';
import { ClientEntity } from '@client/client.entity';
import { AuthService } from '@auth/auth.service';
import { AuthConverter } from '@auth/auth.converter';
import { AccountEntity } from '@account/account.entity';
import { AccountService } from '@account/account.service';
import { BaseController, Context } from '@base/base.controller';
import { ProjectEntity } from '@project/project.entity';
import { ProjectService } from '@project/project.service';
import { ProjectConverter } from '@project/project.converter';
import { AccountDTO } from '@account/account.dto';
import { AccountConverter } from '@account/account.converter';

@controller('/auth')
export class AuthController extends BaseController<UserEntity, UserDTO> {
    static INVALID_PASSWORD = 'Invalid Password Provided!';
    static NO_USER_EXISTS_FOR_EMAIL = 'Invalid Username Provided, Cannot Find User!';
    static NO_USER_EXISTS_FOR_UID = 'Invalid UID Provided!';
    static EXISTING_USER = 'User Already Exists, Cannot Register!';
    static EXISTING_PROJECT = 'Project Slug Already Exists, Cannot Create!';
    static EXISTING_ACCOUNT = 'Account Already Exists, Cannot Add Admin User!';
    static EXISTING_CLIENT = 'Client Already Exists!';
    static NO_EXISTING_ACCOUNT = 'Account Does Not Exist, Cannot Add User!';
    static INVALID_RESET_TOKEN = 'Invalid Password Reset Token Provided!';
    static NO_USER_AUTHENTICATED = 'User is not authenticated!';

    constructor(
        @inject(TYPES.UserService) private userService: UserService,
        @inject(TYPES.UserConverter) private userConverter: UserConverter,
        @inject(TYPES.ClientService) private clientService: ClientService,
        @inject(TYPES.ClientConverter) private clientConverter: ClientConverter,
        @inject(TYPES.ProjectService) private projectService: ProjectService,
        @inject(TYPES.ProjectConverter) private projectConverter: ProjectConverter,
        @inject(TYPES.AuthService) private authService: AuthService,
        @inject(TYPES.AuthConverter) private authConverter: AuthConverter,
        @inject(TYPES.AccountService) private accountService: AccountService,
        @inject(TYPES.AccountConverter) private accountConverter: AccountConverter
    ) {
        super(userService, userConverter, UserEntity, UserDTO);
    }

    @httpGet('/auth')
    public async getAuth(): Promise<undefined | UserDTO> {
        const context: Context = this.context();

        if (context.user.details) {
            return await this.userConverter.toDTO<UserDTO>(context.user.details, UserDTO, context);
        }

        return undefined;
    }

    @httpPost('/register/account', MIDDLEWARE.ValidateRequestObject<RegisterAccountDTO>(RegisterAccountDTO))
    public async registerAccount(@requestBody() body: RegisterAccountDTOBody): Promise<JsonResult | UserDTO> {
        const context: Context = this.context();

        const existingUser: UserEntity | undefined = await this.userService.findExistingUser(body, context);

        if (existingUser) {
            return this.json(AuthController.EXISTING_USER, 400);
        }

        const existingProject: ProjectEntity | undefined = await this.projectService.findBySlug(
            body.projectSlug,
            context
        );

        if (existingProject) {
            return this.json(AuthController.EXISTING_PROJECT, 400);
        }

        const accountEntity: AccountEntity = await this.accountService.createOne(new AccountEntity(), context);

        const userEntity: UserEntity = await this.userService.createOne(
            new UserEntity({
                username: body.username,
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                role: UserRole.Super,
                password: await this.authService.hashPassword(body.password),
                account: accountEntity
            }),
            context
        );

        const projectEntity: ProjectEntity = await this.projectService.createOne(
            new ProjectEntity({
                name: body.projectName,
                slug: body.projectSlug,
                manager: userEntity,
                account: accountEntity
            }),
            context
        );

        const completeUserEntity: UserEntity = await this.userService.saveOne(
            new UserEntity({
                ...userEntity,
                projects: [projectEntity],
                defaultProject: projectEntity
            }),
            context
        );

        return await this.userConverter.toDTO<UserDTO>(completeUserEntity, UserDTO, context);
    }

    @httpPost('/register/user', MIDDLEWARE.ValidateRequestObject<RegisterUserDTO>(RegisterUserDTO))
    public async registerUser(@requestBody() body: RegisterUserDTOBody): Promise<JsonResult | UserDTO> {
        const context: Context = this.context();

        const existingUser: UserEntity | undefined = await this.userService.findExistingUser(body, context);

        if (existingUser) {
            return this.json(AuthController.EXISTING_USER, 400);
        }

        const accountEntity: AccountEntity | undefined = await this.accountService.findByUid(body.accountUid, context);

        if (!accountEntity) {
            return this.json(AuthController.NO_EXISTING_ACCOUNT);
        }

        const userEntity: UserEntity = await this.userService.createOne(
            new UserEntity({
                username: body.username,
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                role: UserRole.Admin, // body.role,
                password: await this.authService.hashPassword(body.password),
                account: accountEntity
            }),
            context
        );

        return await this.userConverter.toDTO<UserDTO>(userEntity, UserDTO, context);
    }

    @httpPost('/register/client', MIDDLEWARE.ValidateRequestObject<RegisterClientDTO>(RegisterClientDTO))
    public async registerClient(@requestBody() body: RegisterClientDTOBody): Promise<JsonResult | ClientDTO> {
        const context: Context = this.context();

        const existingClient: ClientEntity | undefined = await this.clientService.findExistingClient(body, context);

        if (existingClient) {
            return this.json(AuthController.EXISTING_CLIENT, 400);
        }

        const accountEntity: AccountEntity | undefined = await this.accountService.findByUid(body.accountUid, context);

        if (!accountEntity) {
            return this.json(AuthController.NO_EXISTING_ACCOUNT);
        }

        const clientEntity: ClientEntity = await this.clientService.createOne(
            new ClientEntity({
                name: body.name,
                slug: body.slug,
                key: await this.authConverter.toClientJwt(body.slug, body.permissions, context),
                account: accountEntity
            }),
            context
        );

        return await this.clientConverter.toDTO<ClientDTO>(clientEntity, ClientDTO, context);
    }

    @httpPost('/login', MIDDLEWARE.ValidateRequestObject<LoginDTO>(LoginDTO))
    public async login(@requestBody() body: LoginDTOBody): Promise<AuthJwtDTO | JsonResult> {
        const context: Context = this.context();

        const entity: UserEntity | undefined = await this.userService.findByUsername(body.username, context);

        console.log('login: entity: ', entity);

        if (!entity) {
            return this.json(AuthController.NO_USER_EXISTS_FOR_EMAIL, 403);
        }

        if (!this.authService.checkPassword(body.password, entity.password)) {
            return this.json(AuthController.INVALID_PASSWORD, 401);
        }

        return await this.authConverter.toAuthJwt(entity, context);
    }

    @httpPost('/forgot-password', MIDDLEWARE.ValidateRequestObject<ForgotPasswordDTO>(ForgotPasswordDTO))
    public async forgotPassword(@requestBody() body: ForgotPasswordDTOBody): Promise<ResetJwtDTO | JsonResult> {
        const context: Context = this.context();

        const entity: UserEntity | undefined = await this.userService.findByEmail(body.email, context);

        if (!entity) {
            return this.json(AuthController.NO_USER_EXISTS_FOR_EMAIL, 401);
        }

        const resetJwt: ResetJwtDTO & { expires: Date } = await this.authConverter.toResetJwt(entity, context);

        await this.userService.updateByUid(
            entity.uid,
            {
                ...entity,
                resetPasswordToken: resetJwt.token,
                resetPasswordExpires: resetJwt.expires
            },
            context
        );

        return resetJwt;
    }

    @httpPost('/reset-password/:token', MIDDLEWARE.ValidateRequestObject<ResetPasswordDTO>(ResetPasswordDTO))
    public async resetPassword(
        @requestParam('token') token: string,
        @requestBody() body: ResetPasswordDTOBody
    ): Promise<JsonResult | UserEntity> {
        const context: Context = this.context();

        const entity: UserEntity | undefined = await this.userService.findByUid(context.user.details.uid, context);

        if (!entity) {
            return this.json(AuthController.NO_USER_EXISTS_FOR_UID, 403);
        }

        const isValid: boolean = await this.authService.validateResetToken(token, entity, context);

        if (!isValid) {
            return this.json(AuthController.INVALID_RESET_TOKEN, 401);
        }

        return await this.userService.updateByUid(
            entity.uid,
            {
                ...entity,
                password: bcrypt.hashSync(body.password, 8),
                resetPasswordExpires: undefined,
                resetPasswordToken: undefined
            },
            context
        );
    }
}
