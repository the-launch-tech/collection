import { AxiosStatic } from 'axios'

import AuthService from '../../services/AuthService'
import { AuthAction } from '../actions'
import { JWT } from '../../constants'

import { State, WrappedThunkActionCreator, WrappedThunkDispatch, Data, User } from '../../types'

export const authenticate: WrappedThunkActionCreator<void> = () => async (
  dispatch: WrappedThunkDispatch<AxiosStatic>,
  getState: () => State,
  Http: AxiosStatic
): Promise<void> => {
  try {
    const response: Data<User> = await AuthService.authenticate(Http)
    dispatch(AuthAction.mount(response))
    return
  } catch (err) {
    dispatch(AuthAction.mount(false))
    return
  }
}

export const login: WrappedThunkActionCreator<{ pd_access_token: string }> = (body: {
  email: string
  password: string
}) => async (
  dispatch: WrappedThunkDispatch<AxiosStatic>,
  getState: () => State,
  Http: AxiosStatic
): Promise<{ pd_access_token: string }> => {
  try {
    const response: { pd_access_token: string } = await AuthService.login(Http, body)
    if (response.pd_access_token) {
      localStorage.setItem(JWT, response.pd_access_token)
      const user: Data<User> = await AuthService.authenticate(Http)
      dispatch(AuthAction.mount(user))
    }
    return response
  } catch (err) {
    throw err
  }
}
