import { BaseHttpController, controller, httpGet, requestParam, httpPost, requestBody } from 'inversify-express-utils';
import { inject } from 'inversify';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

import { RepositoryTreeDTO } from '@editor/editor.dto';
import * as TYPES from '../../app.types';
import { EditorService } from './editor.service';
import { EditorConverter } from './editor.converter';
import { ProjectService } from '../project/project.service';
import { ProjectEntity } from '../project/project.entity';
import { Context } from '../base/base.controller';
import { JsonResult } from 'inversify-express-utils/lib/results';
import { RepositoryTree, TreeType, FindFileContentsDTOBody, FileContentsDTO } from './editor.dto';
import { ProjectDTO } from '../project/project.dto';
import { ProjectConverter } from '../project/project.converter';

@controller('/editor', TYPES.CheckJWT)
export class EditorController extends BaseHttpController {
    static NO_PROJECT_FOUND = 'Could not find project for slug!';
    static FILE_NOT_FOUND = 'Could not find file at full path!';

    constructor(
        @inject(TYPES.EditorService) private editorService: EditorService,
        @inject(TYPES.EditorConverter) private editorConverter: EditorConverter,
        @inject(TYPES.ProjectService) private projectService: ProjectService,
        @inject(TYPES.ProjectConverter) private projectConverter: ProjectConverter
    ) {
        super();
    }

    @httpGet('/repository-tree/:projectSlug')
    public async findRepositoryTree(
        @requestParam('projectSlug') projectSlug: string
    ): Promise<RepositoryTreeDTO | JsonResult> {
        const projectEntity: ProjectEntity | undefined = await this.projectService.findOne(
            { where: { slug: projectSlug } },
            {} as Context
        );

        if (!projectEntity) {
            return this.json(EditorController.NO_PROJECT_FOUND, 400);
        }

        const rootClientPath: string = path.join(__dirname, '/../../../../../client/core/src');

        return new RepositoryTreeDTO({
            tree: new RepositoryTree(
                {
                    uid: uuidv4(),
                    name: 'src',
                    type: TreeType.Branch,
                    fullPath: rootClientPath,
                    children: []
                },
                rootClientPath
            ),
            project: await this.projectConverter.toDTO<ProjectDTO>(projectEntity, ProjectDTO, {} as Context),
            directory: rootClientPath
        });
    }

    @httpPost('/repository-tree/:projectSlug/file-contents')
    public async findFileContents(@requestBody() body: FindFileContentsDTOBody): Promise<JsonResult | FileContentsDTO> {
        const fileContents: string = fs.readFileSync(body.fullPath, 'utf8');

        if (!fileContents) {
            return this.json(EditorController.FILE_NOT_FOUND, 400);
        }

        return {
            data: fileContents
        };
    }
}
