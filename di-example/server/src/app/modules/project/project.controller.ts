import { controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';

import { ProjectDTO } from '@project/project.dto';
import * as TYPES from '../../app.types';
import { ProjectService } from './project.service';
import { ProjectEntity } from './project.entity';
import { ProjectConverter } from './project.converter';
import { BaseController } from '../base/base.controller';
import { Context } from '@base/base.controller';
import { JsonResult } from 'inversify-express-utils/lib/results';

@controller('/projects', TYPES.CheckJWT)
export class ProjectController extends BaseController<ProjectEntity, ProjectDTO> {
    static NO_DEFAULT_PROJECT_FOUND = 'Could not find default project for user!';

    constructor(
        @inject(TYPES.ProjectService) private projectService: ProjectService,
        @inject(TYPES.ProjectConverter) private projectConverter: ProjectConverter
    ) {
        super(projectService, projectConverter, ProjectEntity, ProjectDTO);
    }

    @httpGet('/default')
    public async getDefaultProjectForUser(): Promise<ProjectDTO | JsonResult> {
        const context: Context = this.context();

        console.log('context.user: ', context.user);

        const entity: ProjectEntity | undefined = await this.projectService.findByUid(
            context.user.details.defaultProject.uid,
            context
        );

        if (!entity) {
            return this.json(ProjectController.NO_DEFAULT_PROJECT_FOUND, 403);
        }

        return await this.projectConverter.toDTO<ProjectDTO>(entity, ProjectDTO, context);
    }
}
