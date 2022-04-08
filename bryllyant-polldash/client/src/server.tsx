require('dotenv').config()

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as express from 'express'
import * as path from 'path'
import * as url from 'url'
import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import cookieParser from 'cookie-parser'
import { renderRoutes, matchRoutes } from 'react-router-config'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { AuthThunk } from './redux/thunks'
import Http from './Http'
import html from './html'
import routes from './routes'
import getStore from './redux'

export type Context = {
  notFound?: boolean
  url?: string
  status?: number
  data?: any
}

const app: express.Application = require('express')()
const http = require('http').createServer(app)

app.use(cookieParser())
app.use(express.static('dist'))

app.get('*', (req, res) => {
  try {
    const HttpStatic = Http(req.cookies.pd_access_token)

    const store = getStore({}, HttpStatic)

    function mount() {
      const branch = matchRoutes(routes, url.parse(req.url).pathname || '')

      const context: Context = {}

      const content = html({
        title: 'PollDash',
        body: ReactDOMServer.renderToString(
          <Provider store={store}>
            <StaticRouter context={context} location={req.url}>
              {renderRoutes(routes)}
            </StaticRouter>
          </Provider>
        ),
        data: store.getState(),
      })

      if (context.notFound || context.status === 404) {
        res.status(404)
      }

      if (context.url) {
        return res.redirect(301, context.url)
      }

      res.send(content)
    }

    store
      .dispatch(AuthThunk.authenticate() as any)
      .then(mount)
      .catch(mount)
  } catch (err) {
    throw err
  }
})

http.listen(process.env.PORT, () => {
  console.log('SSR REACT STARTED: Served Client On ' + process.env.PORT)
})
