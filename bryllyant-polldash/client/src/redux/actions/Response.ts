import { ResponseTypes } from '../types'

import { Action, Data, Response } from '../../types'

export function update(response: Data<Response>): Action {
  return {
    type: ResponseTypes.UPDATE,
    payload: response,
  }
}

export function storeActiveResponses(responses: Data<Response>): Action {
  return {
    type: ResponseTypes.STORE_ACTIVE,
    payload: responses,
  }
}
export function storeReceivedResponses(responses: Data<Response>[]): Action {
  return {
    type: ResponseTypes.STORE_RECEIVED,
    payload: responses,
  }
}

export function storeAuthResponses(responses: Data<Response>[]): Action {
  return {
    type: ResponseTypes.STORE_AUTH,
    payload: responses,
  }
}

export function storeUserResponses(responses: Data<Response>[]): Action {
  return {
    type: ResponseTypes.STORE_USER,
    payload: responses,
  }
}
