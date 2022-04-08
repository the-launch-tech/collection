import { DistributionTypes } from '../types'

import { Action, Data, Distribution } from '../../types'

export function create(distribution: Data<Distribution> | null): Action {
  return {
    type: DistributionTypes.CREATE,
    payload: distribution,
  }
}

export function storeDistributions(distributions: Data<Distribution>[]): Action {
  return {
    type: DistributionTypes.STORE,
    payload: distributions,
  }
}
