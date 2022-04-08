import { inject, injectable } from 'inversify';

import * as TYPES from '@app/app.types';
import { BaseDao } from '../base/base.dao';
import { ProjectConverter } from './project.converter';
import { ProjectEntity } from './project.entity';

@injectable()
export class ProjectDao extends BaseDao<ProjectEntity> {
    constructor(@inject(TYPES.ProjectConverter) private projectConverter: ProjectConverter) {
        super(projectConverter, ProjectEntity, ['manager', 'account']);
    }
}
