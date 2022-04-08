import { injectable, inject } from 'inversify';
import { FindOneOptions } from 'typeorm';

import { RegisterClientDTOBody } from '@auth/auth.dto';
import { BaseService } from '../base/base.service';
import * as TYPES from '../../app.types';
import { ClientDao } from './client.dao';
import { ClientEntity } from './client.entity';
import { Context } from '../base/base.controller';

@injectable()
export class ClientService extends BaseService<ClientEntity> {
    constructor(@inject(TYPES.ClientDao) private clientDao: ClientDao) {
        super(clientDao, ClientEntity);
    }

    public async findExistingClient(body: RegisterClientDTOBody, context: Context): Promise<ClientEntity | undefined> {
        const findOneOptions: FindOneOptions<ClientEntity> = {
            where: { slug: body.slug }
        };

        return await this.findOne(findOneOptions, context);
    }
}
