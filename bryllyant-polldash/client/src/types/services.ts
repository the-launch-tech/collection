import * as React from 'react'

import { Model } from './data'

export type Create<O> = { prefix?: string; suffix?: string; body: O }
export type Find = { prefix?: string; suffix?: string; id: number }
export type FindByIds = {
  prefix?: string
  suffix?: string
  params: {
    ids?: number[]
    adminId?: number
    authorId?: number
    creatorId?: number
    userId?: number
  }
}
export type UpdateById<B> = { prefix?: string; suffix?: string; id: number; body: B }
export type Custom<A> = A
export type Data<D> = Model<D>
export type Confirm = boolean
export type Unknown<R> = R
