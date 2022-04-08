import { IsJWT, IsNotEmpty, ValidateNested } from 'class-validator';

import { Expose } from 'class-transformer';
import { UserDTO } from '@user/user.dto';
import { BaseDTO } from '@base/base.dto';

export class RefreshTokenDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    @ValidateNested()
    user!: UserDTO;

    @IsNotEmpty()
    @IsJWT()
    token!: string;

    constructor(model?: Partial<RefreshTokenDTO>) {
        super();

        Object.assign(this, model);

        this.user = new UserDTO(model?.user);
    }
}
