import {
    EntityTarget,
    getConnection,
    Repository,
    Connection,
    FindManyOptions,
    FindOneOptions,
    DeepPartial
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { injectable, unmanaged } from 'inversify';

import { Context } from '@base/base.controller';
import { BaseConverter } from '@base/base.converter';

@injectable()
export class BaseDao<ENTITY> {
    private converter!: BaseConverter<ENTITY>;
    private entity: new (...args: any[]) => ENTITY;
    private relations: string[] = [];

    public static getRepository<ENTITY>(entity: EntityTarget<ENTITY>, context: Context): Repository<ENTITY> {
        const conn: Connection = getConnection();
        const repository: Repository<ENTITY> = conn.getRepository(entity);
        return repository;
    }

    constructor(
        converter: BaseConverter<ENTITY>,
        @unmanaged() entity: new (...args: any[]) => ENTITY,
        @unmanaged() relations?: string[]
    ) {
        this.converter = converter;
        this.entity = entity;
        this.relations = relations ?? [];
    }

    public async find(options: FindManyOptions<ENTITY>, context: Context): Promise<ENTITY[]> {
        const repo: Repository<ENTITY> = BaseDao.getRepository(this.entity, context);
        const entities: ENTITY[] = await repo.find({ ...options, relations: this.relations });
        return await Promise.all(
            entities.map(async (entity: ENTITY): Promise<ENTITY> => {
                return await this.converter.validateEntity<ENTITY>(entity, this.entity, context);
            })
        );
    }

    public async findByUid(uid: string, context: Context): Promise<ENTITY | undefined> {
        const repo: Repository<ENTITY> = BaseDao.getRepository(this.entity, context);
        const entity: ENTITY | undefined = await repo.findOne({ where: { uid: uid }, relations: this.relations });
        if (!entity) {
            return undefined;
        }
        return await this.converter.validateEntity<ENTITY>(entity, this.entity, context);
    }

    public async findOne(options: FindOneOptions<ENTITY>, context: Context): Promise<ENTITY | undefined> {
        const repo: Repository<ENTITY> = BaseDao.getRepository(this.entity, context);
        const entity: ENTITY | undefined = await repo.findOne({ ...options, relations: this.relations });
        if (!entity) {
            return undefined;
        }
        return await this.converter.validateEntity<ENTITY>(entity, this.entity, context);
    }

    public async saveOne(partial: ENTITY, context: Context): Promise<ENTITY> {
        const repo: Repository<ENTITY> = BaseDao.getRepository(this.entity, context);
        const entity: ENTITY = await repo.save(partial as unknown as DeepPartial<ENTITY>);
        return (await this.findByUid((entity as unknown as { uid: string }).uid, context)) as ENTITY;
    }

    public async createOne(partial: Partial<ENTITY>, context: Context): Promise<ENTITY> {
        const repo: Repository<ENTITY> = BaseDao.getRepository(this.entity, context);
        const entity: ENTITY = await repo.save(partial as unknown as DeepPartial<ENTITY>);
        return (await this.findByUid((entity as unknown as { uid: string }).uid, context)) as ENTITY;
    }

    public async createMany(partials: Partial<ENTITY>[], context: Context): Promise<ENTITY[]> {
        const repo: Repository<ENTITY> = BaseDao.getRepository(this.entity, context);
        return (await repo.save(partials as unknown as DeepPartial<ENTITY>)) as unknown as ENTITY[];
    }

    public async updateByUid(uid: string, partial: Partial<ENTITY>, context: Context): Promise<ENTITY> {
        const repo: Repository<ENTITY> = BaseDao.getRepository(this.entity, context);
        const entity: ENTITY = (await repo.update(
            uid,
            partial as unknown as QueryDeepPartialEntity<ENTITY>
        )) as unknown as ENTITY;
        return (await this.findByUid((entity as unknown as { uid: string }).uid, context)) as ENTITY;
    }

    public async deleteByUid(uid: string, context: Context): Promise<ENTITY> {
        const repo: Repository<ENTITY> = BaseDao.getRepository(this.entity, context);
        return await repo.remove(new this.entity({ uid }));
    }

    public async deleteMany(uids: string[], context: Context): Promise<ENTITY[]> {
        const repo: Repository<ENTITY> = BaseDao.getRepository(this.entity, context);
        return (await repo.remove(
            uids.map((uid: string): ENTITY => new this.entity({ uid })) as unknown as ENTITY
        )) as unknown as ENTITY[];
    }
}
