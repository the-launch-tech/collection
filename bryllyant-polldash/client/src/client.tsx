import * as React from 'react'
import * as ReactDOM from 'react-dom'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { BrowserRouter, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import cookies from 'react-cookies'

import { AuthThunk } from './redux/thunks'
import getStore from './redux'
import routes from './routes'
import { JWT } from './constants'
import Http from './Http'

import './assets/scss/_main.scss'

export interface WindowWithState extends Window {
  INITIAL_STATE?: any
}

const HttpStatic = Http(localStorage.getItem('pd_access_token'))

HttpStatic.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token: string | null = localStorage.getItem(JWT)
    config.headers['Authorization'] = 'Bearer ' + token
    return config
  },
  error => Promise.reject(error)
)

HttpStatic.interceptors.response.use(
  (response: AxiosResponse<any>): AxiosResponse<any> => response,
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(JWT)
      HttpStatic.defaults.headers.common['Authorization'] = 'Bearer '
    }
    return Promise.reject(error)
  }
)

const win: WindowWithState = window

const store = getStore(win.INITIAL_STATE, HttpStatic)

function mountApp() {
  const app: Element | null = document.getElementById('app')
  if (!!app) {
    ReactDOM.hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <Switch>{renderRoutes(routes)}</Switch>
        </BrowserRouter>
      </Provider>,
      app
    )
  }
}

store
  .dispatch(AuthThunk.authenticate() as any)
  .then(mountApp)
  .catch(mountApp)
