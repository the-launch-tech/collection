import { controller } from 'inversify-express-utils';
import { inject } from 'inversify';

import { FileDTO } from '@file/file.dto';
import * as TYPES from '../../app.types';
import { FileService } from './file.service';
import { FileEntity } from './file.entity';
import { FileConverter } from './file.converter';
import { BaseController } from '../base/base.controller';

@controller('/files', TYPES.CheckJWT)
export class FileController extends BaseController<FileEntity, FileDTO> {
    constructor(
        @inject(TYPES.FileService) private fileService: FileService,
        @inject(TYPES.FileConverter) private fileConverter: FileConverter
    ) {
        super(fileService, fileConverter, FileEntity, FileDTO);
    }
}
