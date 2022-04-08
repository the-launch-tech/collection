import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

type ExpressMiddlewareFn = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function ValidateRequestObject<DTO>(dto: new (args: Partial<DTO>) => DTO): ExpressMiddlewareFn {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const dtoClass: DTO = plainToClass(
            dto,
            {
                params: req.params ?? {},
                query: req.query ?? {},
                body: req.body ?? {}
            },
            {
                excludeExtraneousValues: false,
                enableImplicitConversion: false
            }
        );

        const dtoClassInitialized: DTO = new dto(dtoClass);

        const errors: ValidationError[] = await validate(dtoClassInitialized as unknown as Record<string, unknown>);

        if (errors.length > 0) {
            return res.status(403).json({ error: 'Invalid DTO: ' + errors.join(', ') });
        }

        return next();
    };
}
