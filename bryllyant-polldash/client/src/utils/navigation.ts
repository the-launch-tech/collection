import { withRouter } from 'react-router'

import * as Constants from '../constants'

import { NavigationRoute } from '../types'

export const navLeft = (location: any, options: any): NavigationRoute[] => [
  {
    path: null,
    href: Constants.GITHUB,
    label: 'Github',
    auth: false,
    icon: 'fab fa-github',
    children: null,
  },
]

export const navRight = (location: any, options: any): NavigationRoute[] => {
  if (options.id) {
    return [
      {
        path: `/auth/${options.id}`,
        label: 'Dashboard',
        auth: true,
        icon: 'fal fa-user-cog',
        children: null,
      },
      {
        path: null,
        onClick: options.handleLogout,
        label: 'Logout',
        auth: true,
        icon: 'fal fa-logout',
        children: null,
      },
    ]
  }
  return [
    {
      path: '/users/register',
      label: 'Register',
      auth: false,
      icon: 'fal fa-user',
      children: null,
    },
    {
      path: '/users/login',
      label: 'Login',
      auth: false,
      icon: 'fal fa-user-alt',
      children: null,
    },
  ]
}
