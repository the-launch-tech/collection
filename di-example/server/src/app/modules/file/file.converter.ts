import { injectable } from 'inversify';

import { BaseConverter } from '../base/base.converter';
import { FileEntity } from './file.entity';

@injectable()
export class FileConverter extends BaseConverter<FileEntity> {
    constructor() {
        super(FileEntity);
    }
}
