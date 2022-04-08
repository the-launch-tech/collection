import { AuxTypes } from '../types'

import { Action, ModalOptions } from '../../types'

export function loading(isLoading: boolean): Action {
  return {
    type: AuxTypes.LOADING,
    payload: isLoading,
  }
}

export function modal(modalOptions: ModalOptions): Action {
  return {
    type: AuxTypes.MODAL,
    payload: modalOptions,
  }
}
