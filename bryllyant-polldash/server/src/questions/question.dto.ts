import { IsString, IsInt, IsOptional, IsEmail } from 'class-validator'

export class CreateQuestionDto {
  @IsInt()
  authorId: number

  @IsString()
  text: string

  @IsInt()
  pollId: number
}
