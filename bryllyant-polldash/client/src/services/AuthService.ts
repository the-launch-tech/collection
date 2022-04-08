import { AxiosResponse, AxiosStatic } from 'axios'

import errorResponse from '../utils/errorResponse'

import { Data, User } from '../types'

export default class AuthService {
  static async authenticate(Http: AxiosStatic): Promise<Data<User>> {
    try {
      const { data }: AxiosResponse<Data<User>> = await Http.get(`/auth`)
      return data
    } catch (err) {
      throw errorResponse(err)
    }
  }

  static async login(
    Http: AxiosStatic,
    options: { email: string; password: string }
  ): Promise<{ pd_access_token: string }> {
    try {
      const { data }: AxiosResponse<{ pd_access_token: string }> = await Http.post(
        `/auth/login`,
        options
      )
      return data
    } catch (err) {
      throw errorResponse(err)
    }
  }
}
