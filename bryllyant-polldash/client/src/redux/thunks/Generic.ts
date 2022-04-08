import { AxiosStatic } from 'axios'
import { ThunkDispatch } from 'redux-thunk'

import HttpService from '../../services'

import { State, WrappedThunkActionCreator, WrappedThunkDispatch, Data, Confirm } from '../../types'

export async function create<R, B, C>(dispatch: WrappedThunkDispatch<never>, ...options: any[]) {
  const createThunk: WrappedThunkActionCreator<Data<R>> = (
    prefix: string,
    body: B,
    callback?: C
  ) => async (
    dispatch: WrappedThunkDispatch<AxiosStatic>,
    getState: () => State,
    Http: AxiosStatic
  ): Promise<Data<R>> => {
    try {
      const response: Data<R> = await HttpService.create<R, B>(Http, { prefix, body })
      console.log('createThunk response', response)
      if (typeof callback === 'function') {
        await callback(response)
      }
      return response
    } catch (err) {
      throw err
    }
  }

  return await dispatch(createThunk(...options))
}

export async function find<R, C>(dispatch: WrappedThunkDispatch<never>, ...options: any[]) {
  const findThunk: WrappedThunkActionCreator<Data<R>[]> = (
    prefix: string,
    params: { ids: number[] },
    callback?: C
  ) => async (
    dispatch: WrappedThunkDispatch<AxiosStatic>,
    getState: () => State,
    Http: AxiosStatic
  ): Promise<Data<R>[]> => {
    try {
      const response: Data<R>[] = await HttpService.find<R>(Http, { prefix, params })
      if (typeof callback === 'function') {
        await callback(response)
      }
      return response
    } catch (err) {
      throw err
    }
  }

  return await dispatch(findThunk(...options))
}

export async function findOne<R, C>(dispatch: WrappedThunkDispatch<never>, ...options: any[]) {
  const findOneThunk: WrappedThunkActionCreator<Data<any>> = (
    prefix: string,
    id: number,
    callback?: C
  ) => async (
    dispatch: WrappedThunkDispatch<AxiosStatic>,
    getState: () => State,
    Http: AxiosStatic
  ): Promise<Data<R>> => {
    try {
      const response: Data<R> = await HttpService.findOne<R>(Http, { prefix, id })
      if (typeof callback === 'function') {
        await callback(response)
      }
      return response
    } catch (err) {
      throw err
    }
  }

  return await dispatch(findOneThunk(...options))
}

export async function update<R, B, C>(dispatch: WrappedThunkDispatch<never>, ...options: any[]) {
  const updateThunk: WrappedThunkActionCreator<Data<any>> = (
    prefix: string,
    id: number,
    body: B,
    suffix?: string,
    callback?: C
  ) => async (
    dispatch: WrappedThunkDispatch<AxiosStatic>,
    getState: () => State,
    Http: AxiosStatic
  ): Promise<Data<R>> => {
    try {
      const response: Data<R> = await HttpService.update<R, B>(Http, { prefix, suffix, id, body })
      if (typeof callback === 'function') {
        await callback(response)
      }
      return response
    } catch (err) {
      throw err
    }
  }

  return await dispatch(updateThunk(...options))
}

export async function remove<C>(dispatch: WrappedThunkDispatch<never>, ...options: any[]) {
  const removeThunk: WrappedThunkActionCreator<Confirm> = (
    prefix: string,
    id: number,
    callback?: C
  ) => async (
    dispatch: WrappedThunkDispatch<AxiosStatic>,
    getState: () => State,
    Http: AxiosStatic
  ): Promise<Confirm> => {
    try {
      const response: Confirm = await HttpService.remove(Http, { prefix, id })
      if (typeof callback === 'function') {
        await callback(response)
      }
      return response
    } catch (err) {
      throw err
    }
  }

  return await dispatch(removeThunk(...options))
}
