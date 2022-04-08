import { injectable } from 'inversify';

import { BaseConverter } from '../base/base.converter';
import { ClientEntity } from './client.entity';

@injectable()
export class ClientConverter extends BaseConverter<ClientEntity> {
    constructor() {
        super(ClientEntity);
    }
}
