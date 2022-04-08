import { controller } from 'inversify-express-utils';
import { inject } from 'inversify';

import { ClientDTO } from '@client/client.dto';
import * as TYPES from '../../app.types';
import { ClientService } from './client.service';
import { ClientEntity } from './client.entity';
import { ClientConverter } from './client.converter';
import { BaseController } from '../base/base.controller';

@controller('/clients', TYPES.CheckJWT)
export class ClientController extends BaseController<ClientEntity, ClientDTO> {
    constructor(
        @inject(TYPES.ClientService) private clientService: ClientService,
        @inject(TYPES.ClientConverter) private clientConverter: ClientConverter
    ) {
        super(clientService, clientConverter, ClientEntity, ClientDTO);
    }
}
