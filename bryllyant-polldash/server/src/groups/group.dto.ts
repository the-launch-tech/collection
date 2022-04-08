import { IsString, IsInt, IsOptional, ArrayUnique } from 'class-validator'

export class CreateGroupDto {
  @IsInt()
  creatorId: number

  @IsString()
  name: string

  @IsOptional()
  @IsInt({ each: true })
  userIds?: number[]
}

export class UpdateGroupDto {
  @IsString()
  name: string
}
