import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function ValidateNestedActionMeta(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'validateNestedActionMeta',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    // const [relatedPropertyName] = args.constraints;
                    // const relatedValue = (args.object as any)[relatedPropertyName];
                    return true;
                }
            }
        });
    };
}
