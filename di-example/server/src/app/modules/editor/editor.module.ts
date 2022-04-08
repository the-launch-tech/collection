import { AsyncContainerModule } from 'inversify';

import { EditorService } from './editor.service';
import { EditorConverter } from './editor.converter';
import * as TYPES from '../../app.types';

export const EditorModule = new AsyncContainerModule(async (bind) => {
    await require('./editor.controller');

    bind<EditorService>(TYPES.EditorService).to(EditorService).inRequestScope();
    bind<EditorConverter>(TYPES.EditorConverter).to(EditorConverter).inRequestScope();
});
