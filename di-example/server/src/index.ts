import 'module-alias/register';
import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';

import { InversifyExpressServer, getRouteInfo, RouteInfo } from 'inversify-express-utils';
import { createConnection } from 'typeorm';
import * as prettyjson from 'prettyjson';
import * as express from 'express';
import cors from 'cors';

import { getConnectionOption } from '@config/typeorm.config';
import { AppModule } from '@app/app.module';
import { AuthProvider } from '@providers/auth.provider';

createConnection(getConnectionOption())
    .then(AppModule)
    .then((ModuleContainer) => {
        console.info('Connection Created');

        const app: InversifyExpressServer = new InversifyExpressServer(ModuleContainer, null, null, null, AuthProvider);

        app.setConfig((expressApp: express.Application): void => {
            expressApp.use(cors({ credentials: true, origin: true }));
            expressApp.use(express.urlencoded({ extended: true }));
            expressApp.use(express.json());
        })
            .build()
            .listen(process.env.PORT, (): void => {
                console.log(`Server running at http://127.0.0.1:${process.env.PORT}/`);
                const routeInfo: RouteInfo[] = getRouteInfo(ModuleContainer);
                console.log(prettyjson.render({ routes: routeInfo }));
            });
    })
    .catch((error: unknown): void => console.error('Error Creating Connection: ', error));
