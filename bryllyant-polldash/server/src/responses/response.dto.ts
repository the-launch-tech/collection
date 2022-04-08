export class CreateResponseDto {
  distributionId: number
  userId: number
}

export class UpdateResponseDto {
  answers: { questionId: number; answer: 'yes' | 'no' }[]
}
