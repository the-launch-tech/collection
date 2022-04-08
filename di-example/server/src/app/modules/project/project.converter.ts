import { injectable } from 'inversify';

import { BaseConverter } from '../base/base.converter';
import { ProjectEntity } from './project.entity';

@injectable()
export class ProjectConverter extends BaseConverter<ProjectEntity> {
    constructor() {
        super(ProjectEntity);
    }
}
