import { IsNotEmpty, IsString, IsDate, IsNumber, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class BaseDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    uid!: string;

    @Expose()
    @IsNotEmpty()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsNotEmpty()
    @IsDate()
    updatedAt!: Date;

    @Expose()
    @IsOptional()
    @IsDate()
    deletedAt!: Date;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    version!: number;
}
