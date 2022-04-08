import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'

@Injectable()
export class ParseIntArrayPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('Validation failed')
    }
    if (Array.isArray(value)) {
      return value.map((item: string | number): number => {
        if (typeof item === 'string') {
          return parseInt(item)
        } else if (typeof item === 'number') {
          return item
        }
        throw new BadRequestException('Validation failed')
      })
    } else if (typeof value === 'string') {
      return parseInt(value)
    } else if (typeof value === 'number') {
      return value
    }
    throw new BadRequestException('Validation failed')
  }
}
