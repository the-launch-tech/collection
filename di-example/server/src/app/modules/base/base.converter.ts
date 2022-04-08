import { plainToClass } from 'class-transformer';
import { ValidationOptions, ValidationError, validate } from 'class-validator';
import { injectable, unmanaged } from 'inversify';

import { Context } from '@base/base.controller';

@injectable()
export class BaseConverter<ENTITY> {
    private entity: new (...args: any[]) => ENTITY;

    protected async validateResponseObject<DTO>(
        dto: new (...args: any[]) => DTO,
        plainClass: Partial<DTO>,
        options?: ValidationOptions
    ): Promise<DTO> {
        return await BaseConverter.validateResponseObject<DTO>(dto, plainClass, options);
    }

    public static async validateResponseObject<DTO>(
        dto: new (...args: any[]) => DTO,
        plainClass: Partial<DTO>,
        options?: ValidationOptions
    ): Promise<DTO> {
        const dtoClass: DTO = plainToClass(
            dto,
            plainClass,
            options ?? {
                enableImplicitConversion: true
            }
        );

        const dtoClassInitialized: DTO = new dto(dtoClass);

        const errors: ValidationError[] = await validate(dtoClassInitialized as any);

        if (errors.length > 0) {
            throw new Error();
        }

        return dtoClass;
    }

    constructor(@unmanaged() entity: new (...args: any[]) => ENTITY) {
        this.entity = entity;
    }

    public async toDTO<DTO>(entity: ENTITY, dto: new (...args: any[]) => DTO, context: Context): Promise<DTO> {
        const dtoClass: DTO = plainToClass(dto, entity, { enableImplicitConversion: true });

        const dtoClassInitialized: DTO = new dto(dtoClass);

        const errors: ValidationError[] = await validate(dtoClassInitialized as any);

        if (errors.length > 0) {
            console.log('dtoClass: errors: ', errors);
            throw new Error();
        }

        return dtoClass;
    }

    public async validateEntity<ENTITY>(
        entity: ENTITY,
        classObject: new (...args: any[]) => ENTITY,
        context: Context
    ): Promise<ENTITY> {
        const entityClass: ENTITY = plainToClass(classObject, entity, { enableImplicitConversion: true });

        const dtoClassInitialized: ENTITY = new classObject(entityClass);

        const errors: ValidationError[] = await validate(dtoClassInitialized as any);

        console.log('entityClass: errors: ', errors);

        if (errors.length > 0) {
            console.log('entityClass: errors: ', errors);
            throw new Error();
        }

        return entityClass;
    }
}
