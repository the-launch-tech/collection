import { inject, injectable } from 'inversify';

import * as TYPES from '@app/app.types';
import { BaseDao } from '../base/base.dao';
import { ClientEntity } from './client.entity';
import { ClientConverter } from '@client/client.converter';

@injectable()
export class ClientDao extends BaseDao<ClientEntity> {
    constructor(@inject(TYPES.ClientConverter) private clientConverter: ClientConverter) {
        super(clientConverter, ClientEntity, ['account']);
    }
}
