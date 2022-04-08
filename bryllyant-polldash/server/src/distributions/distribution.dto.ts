export class CreateDistributionDto {
  subject: string
  body?: string
  pollId: number
  adminId: number
  userIds?: number[]
  groupIds?: number[]
  provider: 'SENDGRID' | 'MOCK'
}
