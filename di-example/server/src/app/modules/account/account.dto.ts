import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Expose } from 'class-transformer';

import { UserDTO } from '@user/user.dto';
import { ProjectDTO } from '@project/project.dto';
import { ClientDTO } from '@client/client.dto';
import { BaseDTO } from '@base/base.dto';

export class AccountDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    users!: UserDTO[];

    @Expose()
    @IsNotEmpty()
    projects!: ProjectDTO[];

    @Expose()
    @IsOptional()
    clients!: ClientDTO[];

    constructor(model?: Partial<AccountDTO>) {
        super();

        Object.assign(this, model);
    }
}
