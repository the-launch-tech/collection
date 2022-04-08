import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { ProjectService } from './project.service';
import { ProjectConverter } from './project.converter';
import { ProjectEntity } from './project.entity';
import { ProjectDao } from './project.dao';
import * as TYPES from '../../app.types';
import { Context } from '../base/base.controller';

export const ProjectModule = new AsyncContainerModule(async (bind) => {
    await require('./project.controller');

    bind<ProjectDao>(TYPES.ProjectDao).to(ProjectDao).inRequestScope();
    bind<ProjectService>(TYPES.ProjectService).to(ProjectService).inRequestScope();
    bind<ProjectConverter>(TYPES.ProjectConverter).to(ProjectConverter).inRequestScope();

    bind<Repository<ProjectEntity>>(TYPES.ProjectRepository)
        .toDynamicValue(
            (): Repository<ProjectEntity> => ProjectDao.getRepository<ProjectEntity>(ProjectEntity, {} as Context)
        )
        .inRequestScope();
});
