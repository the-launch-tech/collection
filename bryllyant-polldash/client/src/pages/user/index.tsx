import * as React from 'react'
import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { userRoutes } from '../../routes'

export type UserProps = {}

export const User: React.FC<UserProps> = ({ children }): JSX.Element => {
  return <Switch>{renderRoutes(userRoutes)}</Switch>
}
