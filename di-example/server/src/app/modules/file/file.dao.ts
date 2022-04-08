import { inject, injectable } from 'inversify';

import * as TYPES from '@app/app.types';
import { BaseDao } from '../base/base.dao';
import { FileConverter } from './file.converter';
import { FileEntity } from './file.entity';

@injectable()
export class FileDao extends BaseDao<FileEntity> {
    constructor(@inject(TYPES.FileConverter) private fileConverter: FileConverter) {
        super(fileConverter, FileEntity, ['project', 'account', 'user', 'thumbnail']);
    }
}
