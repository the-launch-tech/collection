import { AxiosResponse, AxiosStatic } from 'axios'

import errorResponse from '../utils/errorResponse'

import { Create, Find, FindByIds, UpdateById, Data, Confirm, User } from '../types'

export default class HttpService {
  public static async find<M>(Http: AxiosStatic, options: FindByIds): Promise<Data<M>[]> {
    try {
      console.log('options', options)
      const { data }: AxiosResponse<Data<M>[]> = await Http.get(`/${options.prefix}`, {
        params: options.params,
      })
      return data
    } catch (err) {
      throw errorResponse(err)
    }
  }

  public static async findOne<M>(Http: AxiosStatic, options: Find): Promise<Data<M>> {
    try {
      const { data }: AxiosResponse<Data<M>> = await Http.get(`/${options.prefix}/${options.id}`)
      return data
    } catch (err) {
      throw errorResponse(err)
    }
  }

  public static async create<M, B>(Http: AxiosStatic, options: Create<B>): Promise<Data<M>> {
    console.log('service create', options)
    try {
      const { data }: AxiosResponse<Data<M>> = await Http.post(`/${options.prefix}`, options.body)
      return data
    } catch (err) {
      throw errorResponse(err)
    }
  }

  public static async update<M, B>(Http: AxiosStatic, options: UpdateById<B>): Promise<Data<M>> {
    try {
      console.log('http options', options)
      const { data }: AxiosResponse<Data<M>> = await Http.put(
        `/${options.prefix}/${options.id}${options.suffix ? '/' + options.suffix : ''}`,
        options.body
      )
      return data
    } catch (err) {
      throw errorResponse(err)
    }
  }

  public static async remove(Http: AxiosStatic, options: Find): Promise<Confirm> {
    try {
      const { data }: AxiosResponse<Confirm> = await Http.delete(`/${options.prefix}/${options.id}`)
      return data
    } catch (err) {
      throw errorResponse(err)
    }
  }
}
