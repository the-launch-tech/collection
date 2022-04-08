import { injectable, unmanaged } from 'inversify';
import { FindManyOptions, FindOneOptions } from 'typeorm';

import { Context } from '@base/base.controller';
import { BaseDao } from '@base/base.dao';

@injectable()
export class BaseService<ENTITY> {
    dao: BaseDao<ENTITY>;
    entity: new (...args: any[]) => ENTITY;

    constructor(dao: BaseDao<ENTITY>, @unmanaged() entity: new (...args: any[]) => ENTITY) {
        this.dao = dao;
        this.entity = entity;
    }

    public async find(options: FindManyOptions<ENTITY>, context: Context): Promise<ENTITY[]> {
        return await this.dao.find(options, context);
    }

    public async findByUid(uid: string, context: Context): Promise<ENTITY | undefined> {
        return await this.dao.findByUid(uid, context);
    }

    public async findOne(options: FindOneOptions<ENTITY>, context: Context): Promise<ENTITY | undefined> {
        return await this.dao.findOne(options, context);
    }

    public async saveOne(partial: ENTITY, context: Context): Promise<ENTITY> {
        return await this.dao.createOne(partial, context);
    }

    public async createOne(partial: Partial<ENTITY>, context: Context): Promise<ENTITY> {
        return await this.dao.createOne(partial, context);
    }

    public async createMany(partials: Partial<ENTITY>[], context: Context): Promise<ENTITY[]> {
        return await this.dao.createMany(partials, context);
    }

    public async updateByUid(uid: string, partial: Partial<ENTITY>, context: Context): Promise<ENTITY> {
        return await this.dao.updateByUid(uid, partial, context);
    }

    public async deleteByUid(uid: string, context: Context): Promise<ENTITY> {
        return await this.dao.deleteByUid(uid, context);
    }

    public async deleteMany(uids: string[], context: Context): Promise<ENTITY[]> {
        return await this.dao.deleteMany(uids, context);
    }
}
