import { IsString, IsInt, IsOptional, IsEmail } from 'class-validator'

export class CreateUserDto {
  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  mobile?: string

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  passwordConfirmation?: string

  @IsString()
  role: 'user' | 'admin'

  @IsOptional()
  @IsInt()
  adminId?: number
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsString()
  lastName?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  mobile?: string

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  role?: 'user' | 'admin'
}
