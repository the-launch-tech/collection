import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length, ValidateNested } from 'class-validator';

import { AccountDTO } from '../account/account.dto';
import { BaseDTO } from '../base/base.dto';

export class ClientDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    @ValidateNested()
    account: AccountDTO;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    name!: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    slug!: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    key!: string;

    constructor(model?: Partial<ClientDTO>) {
        super();

        Object.assign(this, model);

        this.account = new AccountDTO(model?.account);
    }
}
