import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { FileService } from './file.service';
import { FileConverter } from './file.converter';
import { FileEntity } from './file.entity';
import { FileDao } from './file.dao';
import * as TYPES from '../../app.types';
import { Context } from '../base/base.controller';

export const FileModule = new AsyncContainerModule(async (bind) => {
    await require('./file.controller');

    bind<FileDao>(TYPES.FileDao).to(FileDao).inRequestScope();
    bind<FileService>(TYPES.FileService).to(FileService).inRequestScope();
    bind<FileConverter>(TYPES.FileConverter).to(FileConverter).inRequestScope();

    bind<Repository<FileEntity>>(TYPES.FileRepository)
        .toDynamicValue((): Repository<FileEntity> => FileDao.getRepository<FileEntity>(FileEntity, {} as Context))
        .inRequestScope();
});
