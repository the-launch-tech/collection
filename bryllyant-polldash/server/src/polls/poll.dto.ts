import { IsString, IsInt } from 'class-validator'

export class CreatePollDto {
  @IsInt()
  authorId: number

  @IsString()
  title: string

  @IsString({ each: true })
  text: string[]
}

export class UpdatePollDto {
  @IsString()
  title: string
}
