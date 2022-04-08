import { injectable } from 'inversify';

import { BaseConverter } from '../base/base.converter';
import { UserEntity } from './user.entity';

@injectable()
export class UserConverter extends BaseConverter<UserEntity> {
    constructor() {
        super(UserEntity);
    }
}
