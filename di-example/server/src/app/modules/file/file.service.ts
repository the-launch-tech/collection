import { injectable, inject } from 'inversify';

import { BaseService } from '../base/base.service';
import * as TYPES from '../../app.types';
import { FileDao } from './file.dao';
import { FileEntity } from './file.entity';

@injectable()
export class FileService extends BaseService<FileEntity> {
    constructor(@inject(TYPES.FileDao) private fileDao: FileDao) {
        super(fileDao, FileEntity);
    }
}
