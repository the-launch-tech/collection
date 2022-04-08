import {
    Principal,
    BaseHttpController,
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
    requestParam,
    requestBody,
    queryParam,
    request
} from 'inversify-express-utils';
import * as express from 'express';
import { JsonResult } from 'inversify-express-utils/lib/results';
import { unmanaged } from 'inversify';

import { BaseService } from '@base/base.service';
import { BaseConverter } from '@base/base.converter';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { Request } from 'express';

export interface Context {
    request: express.Request;
    response: express.Response;
    user: Principal;
}

export class BaseController<ENTITY, DTO> extends BaseHttpController {
    private service: BaseService<ENTITY>;
    private converter: BaseConverter<ENTITY>;
    private entity: new (...args: any[]) => ENTITY;
    private dto: new (...args: any[]) => DTO;

    protected context(): Context {
        return {
            user: this.httpContext.user,
            request: this.httpContext.request,
            response: this.httpContext.response
        };
    }

    protected prepareQuery<OPTS>(query: any, context: Context): OPTS {
        if (query.skip) {
            query.skip = Number(query.skip);
        }

        if (query.take) {
            query.take = Number(query.take);
        }

        if (Array.isArray(query.where)) {
            query.where = query.where.map(
                (condition: string): Record<string, unknown> => JSON.parse(condition) as Record<string, unknown>
            );
        } else if (query.where) {
            query.where = JSON.parse(query.where as string);
        }

        return query as OPTS;
    }

    constructor(
        service: BaseService<ENTITY>,
        converter: BaseConverter<ENTITY>,
        @unmanaged() entity: new (...args: any[]) => ENTITY,
        @unmanaged() dto: new (...args: any[]) => DTO
    ) {
        super();

        this.service = service;
        this.converter = converter;
        this.entity = entity;
        this.dto = dto;
    }

    @httpGet('/')
    public async findOne(@queryParam() query: FindOneOptions<ENTITY>): Promise<JsonResult | DTO> {
        const context: Context = this.context();
        query = this.prepareQuery<FindOneOptions<ENTITY>>(query, context);

        const entity: ENTITY | undefined = await this.service.findOne(query, context);

        if (!entity) {
            return this.json(null, 200);
        }

        return await this.converter.toDTO<DTO>(entity, this.dto, context);
    }

    @httpGet('/many')
    public async find(
        @request() req: Request,
        @queryParam() query: FindManyOptions<ENTITY>
    ): Promise<JsonResult | DTO[]> {
        const context: Context = this.context();
        query = this.prepareQuery<FindManyOptions<ENTITY>>(query, context);

        const entities: ENTITY[] = await this.service.find(query, context);

        if (!entities.length) {
            return this.json([], 200);
        }

        return await Promise.all(
            entities.map(async (entity: ENTITY): Promise<DTO> => {
                return await this.converter.toDTO<DTO>(entity, this.dto, context);
            })
        );
    }

    @httpGet('/:uid')
    public async findByUid(@requestParam('uid') uid: string): Promise<JsonResult | DTO> {
        const context: Context = this.context();

        const entity: ENTITY | undefined = await this.service.findByUid(uid, context);

        if (!entity) {
            return this.json(undefined, 200);
        }

        return await this.converter.toDTO<DTO>(entity, this.dto, context);
    }

    @httpPost('/')
    public async createOne(@requestBody() body: Partial<ENTITY>): Promise<DTO> {
        const context: Context = this.context();

        const entity: ENTITY = await this.service.createOne(body, context);

        return await this.converter.toDTO<DTO>(entity, this.dto, context);
    }

    @httpPut('/:uid')
    public async updateByUid(
        @requestParam('uid') uid: string,
        @requestBody() body: Partial<ENTITY>
    ): Promise<JsonResult | DTO> {
        const context: Context = this.context();

        const entity: ENTITY = await this.service.updateByUid(uid, body, context);

        if (!entity) {
            return this.json(undefined, 200);
        }

        return await this.converter.toDTO<DTO>(entity, this.dto, context);
    }

    @httpDelete('/:uid')
    public async deleteByUid(@requestParam('uid') uid: string): Promise<JsonResult> {
        const context: Context = this.context();

        const entity: ENTITY = await this.service.deleteByUid(uid, context);

        if (!entity) {
            return this.json({ deleted: false }, 200);
        }

        return this.json({ deleted: true }, 200);
    }
}
