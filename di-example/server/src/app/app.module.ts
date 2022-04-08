import { Container } from 'inversify';

import { moduleBindings } from '@modules/bindings';
import { middlewareBindings } from '@middleware/bindings';

export async function AppModule(): Promise<Container> {
    let container: Container = new Container();

    container = await middlewareBindings(container);
    container = await moduleBindings(container);

    console.log('App Module Container Loaded: ', container);

    return container;
}
