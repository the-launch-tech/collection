import { IsNotEmpty, IsString, IsEnum, IsEmail, Length, ValidateNested } from 'class-validator';

export class AuthJwtDTO {
    @IsNotEmpty()
    @IsString()
    token!: string;

    @IsNotEmpty()
    @IsString()
    refreshToken!: string;
}

export class ForgotPasswordDTOBody {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    constructor(model?: Partial<ForgotPasswordDTOBody>) {
        Object.assign(this, model);
    }
}

export class ForgotPasswordDTO {
    @IsNotEmpty()
    params!: Record<string, never>;

    @IsNotEmpty()
    query!: Record<string, never>;

    @IsNotEmpty()
    @ValidateNested()
    body: ForgotPasswordDTOBody;

    constructor(model?: Partial<ForgotPasswordDTO>) {
        Object.assign(this, model);

        this.body = new ForgotPasswordDTOBody(model?.body);
    }
}

export class LoginDTOBody {
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    username!: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 100)
    password!: string;

    constructor(model?: Partial<LoginDTOBody>) {
        Object.assign(this, model);
    }
}

export class LoginDTO {
    @IsNotEmpty()
    params!: Record<string, never>;

    @IsNotEmpty()
    query!: Record<string, never>;

    @IsNotEmpty()
    @ValidateNested()
    body: LoginDTOBody;

    constructor(model?: Partial<LoginDTO>) {
        Object.assign(this, model);

        this.body = new LoginDTOBody(model?.body);
    }
}

export class RegisterAccountDTOBody {
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    username!: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 100)
    password!: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 100)
    passwordConfirmation!: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    firstName!: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    lastName!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    projectName!: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    projectSlug!: string;

    constructor(model?: Partial<RegisterAccountDTOBody>) {
        Object.assign(this, model);
    }
}

export class RegisterAccountDTO {
    @IsNotEmpty()
    params!: Record<string, never>;

    @IsNotEmpty()
    query!: Record<string, never>;

    @IsNotEmpty()
    @ValidateNested()
    body: RegisterAccountDTOBody;

    constructor(model?: Partial<RegisterAccountDTO>) {
        Object.assign(this, model);

        this.body = new RegisterAccountDTOBody(model?.body);
    }
}

export enum AccessLevel {
    None = 'none',
    Read = 'read',
    Edit = 'edit',
    Write = 'write'
}

export class ClientPermissions {
    @IsNotEmpty()
    @IsEnum(AccessLevel)
    account!: AccessLevel;

    @IsNotEmpty()
    @IsEnum(AccessLevel)
    user!: AccessLevel;

    @IsNotEmpty()
    @IsEnum(AccessLevel)
    project!: AccessLevel;

    @IsString({ each: true })
    userUids!: string[];

    @IsString({ each: true })
    projectUids!: string[];

    constructor(model?: Partial<ClientPermissions>) {
        Object.assign(this, model);
    }
}

export class RegisterClientDTOBody {
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    name!: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 100)
    slug!: string;

    @IsNotEmpty()
    @ValidateNested()
    permissions: ClientPermissions;

    @IsNotEmpty()
    @IsString()
    accountUid!: string;

    constructor(model?: Partial<RegisterClientDTOBody>) {
        Object.assign(this, model);

        this.permissions = new ClientPermissions(model?.permissions);
    }
}

export class RegisterClientDTO {
    @IsNotEmpty()
    params!: Record<string, never>;

    @IsNotEmpty()
    query!: Record<string, never>;

    @IsNotEmpty()
    @ValidateNested()
    body: RegisterClientDTOBody;

    constructor(model?: Partial<RegisterClientDTO>) {
        Object.assign(this, model);

        this.body = new RegisterClientDTOBody(model?.body);
    }
}

export class RegisterUserDTOBody {
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    username!: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 100)
    password!: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    firstName!: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    lastName!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    accountUid!: string;

    constructor(model?: Partial<RegisterUserDTOBody>) {
        Object.assign(this, model);
    }
}

export class RegisterUserDTO {
    @IsNotEmpty()
    params!: Record<string, never>;

    @IsNotEmpty()
    query!: Record<string, never>;

    @IsNotEmpty()
    @ValidateNested()
    body: RegisterUserDTOBody;

    constructor(model?: Partial<RegisterUserDTO>) {
        Object.assign(this, model);

        this.body = new RegisterUserDTOBody(model?.body);
    }
}

export class ResetJwtDTO {
    @IsNotEmpty()
    @IsString()
    token!: string;
}

export class ResetPasswordDTOBody {
    @IsNotEmpty()
    @IsString()
    @Length(8, 100)
    password!: string;

    constructor(model?: Partial<ResetPasswordDTOBody>) {
        Object.assign(this, model);
    }
}

export class ResetPasswordDTO {
    @IsNotEmpty()
    params!: Record<string, never>;

    @IsNotEmpty()
    query!: Record<string, never>;

    @IsNotEmpty()
    @ValidateNested()
    body: ResetPasswordDTOBody;

    constructor(model?: Partial<ResetPasswordDTO>) {
        Object.assign(this, model);

        this.body = new ResetPasswordDTOBody(model?.body);
    }
}
