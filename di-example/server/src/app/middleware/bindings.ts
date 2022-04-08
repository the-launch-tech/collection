import { Container } from 'inversify';

import * as MIDDLEWARE from './index';
import * as TYPES from '../app.types';

export async function middlewareBindings(container: Container): Promise<Container> {
    container.bind<MIDDLEWARE.CheckJWT>(TYPES.CheckJWT).to(MIDDLEWARE.CheckJWT);

    return container;
}
