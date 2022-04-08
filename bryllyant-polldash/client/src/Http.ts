import axios, {
  AxiosResponse,
  AxiosError,
  AxiosStatic,
  AxiosRequestConfig,
  AxiosInstance,
} from 'axios'
import cookie from 'react-cookies'

import { SERVER_URL, JWT } from './constants'

export default function(token: string | null): AxiosStatic {
  const Http: AxiosStatic = axios

  Http.defaults.baseURL = SERVER_URL
  Http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  Http.defaults.headers.common['Accept'] = 'application/json'
  Http.defaults.headers.common['Content-Type'] = 'application/json'

  if (!!token) {
    Http.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }

  return Http
}
