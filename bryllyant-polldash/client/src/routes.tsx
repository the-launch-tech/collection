import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'

import { ConnectedMain as Main } from './Main'
import { ConnectedHome as Home } from './pages/home'
import { User } from './pages/user'
import { ConnectedRegister as Register } from './pages/register'
import { ConnectedLogin as Login } from './pages/login'
import { ConnectedAuth as Auth } from './pages/auth'
import { ConnectedDashboard as Dashboard } from './pages/auth/dashboard'
import { ConnectedGroups as Groups } from './pages/auth/groups'
import { ConnectedPolls as Polls } from './pages/auth/polls'
import { ConnectedResponses as Responses } from './pages/auth/responses'
import { ConnectedDistributions as Distributions } from './pages/auth/distributions'
import { ConnectedUsers as Users } from './pages/auth/users'
import { ConnectedUser as SingleUser } from './pages/auth/users/User'
import { ConnectedSurveyResponse as SurveyResponse } from './pages/surveyResponse'

import { NotFound } from './pages/notFound'

export const userRoutes: RouteConfig[] = [
  {
    path: '/users/register',
    component: Register,
    exact: true,
  },
  {
    path: '/users/login',
    component: Login,
    exact: true,
  },
]

export const authRoutes: RouteConfig[] = [
  {
    path: '/auth/:id',
    component: Dashboard as any,
    exact: true,
  },
  {
    path: '/auth/:id/users',
    component: Users,
    exact: true,
  },
  {
    path: '/auth/:id/groups',
    component: Groups,
    exact: true,
  },
  {
    path: '/auth/:id/polls',
    component: Polls,
    exact: true,
  },
  {
    path: '/auth/:id/responses',
    component: Responses,
    exact: true,
  },
  {
    path: '/auth/:id/distributions',
    component: Distributions,
    exact: true,
  },
  {
    path: '/auth/:id/users/:userId',
    component: SingleUser,
    exact: true,
  },
]

export const mainRoutes: RouteConfig[] = [
  {
    path: '/',
    component: Home as any,
    exact: true,
  },
  {
    path: '/users',
    component: User,
    exact: false,
    routes: userRoutes,
  },
  {
    path: '/auth/:id',
    component: Auth as any,
    exact: false,
    children: authRoutes,
  },
  {
    path: '/survey',
    component: SurveyResponse,
    exact: false,
  },
]

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Main,
    exact: false,
    routes: mainRoutes,
  },
  {
    path: '/404',
    component: NotFound,
    exact: true,
  },
  {
    path: '*',
    component: () => <Redirect to="/404" />,
    exact: false,
  },
]

export default routes
