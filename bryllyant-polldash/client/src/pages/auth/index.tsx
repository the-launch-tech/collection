import * as React from 'react'
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config'
import { Redirect, Switch } from 'react-router-dom'

import Maps from '../../redux/maps'
import { Props, handleExport } from './config'
import { Content } from '../../components/shared/Content'
import { WrappedAuthNavigation as AuthNavigation } from '../../components/AuthNavigation'
import { authRoutes } from '../../routes'
import * as Constants from '../../constants'

export type AuthProps = Props

const Auth: React.FC<AuthProps> = (props: Props): JSX.Element => {
  const { auth, isAuthenticated } = props

  if (!auth) {
    return <Redirect to="/users/login" />
  }

  return (
    <Content classNames={['auth', 'full', 'flex', 'wrap', 'justify-start', 'align-start']}>
      <AuthNavigation />
      <div className="auth-content">
        <Content classNames={['full', 'flex', 'justify-center', 'align-center']}>
          <header>
            <h3>
              {auth.firstName} {auth.lastName}'s PollDash Dashboard
            </h3>
          </header>
        </Content>
        <Content
          classNames={[
            'scroll-container',
            'full',
            'h-full',
            'flex',
            'justify-center',
            'align-stretch',
          ]}
        >
          <Switch>{renderRoutes(authRoutes)}</Switch>
        </Content>
      </div>
    </Content>
  )
}

export const ConnectedAuth = handleExport(Auth)
