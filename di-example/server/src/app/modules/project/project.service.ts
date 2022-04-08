import { injectable, inject } from 'inversify';
import { FindOneOptions } from 'typeorm';

import { BaseService } from '../base/base.service';
import * as TYPES from '../../app.types';
import { ProjectDao } from './project.dao';
import { ProjectEntity } from './project.entity';
import { Context } from '@base/base.controller';

@injectable()
export class ProjectService extends BaseService<ProjectEntity> {
    constructor(@inject(TYPES.ProjectDao) private projectDao: ProjectDao) {
        super(projectDao, ProjectEntity);
    }

    public async findBySlug(slug: string, context: Context): Promise<ProjectEntity | undefined> {
        const findOneOptions: FindOneOptions<ProjectEntity> = {
            where: { slug: slug }
        };

        return await this.findOne(findOneOptions, context);
    }
}
