import * as React from 'react'
import { Link } from 'react-router-dom'

import { Content } from '../../components/shared/Content'

import { handleExport, Props } from './config'

export type HomeProps = Props

const Home: React.FC<Props> = ({ auth }): JSX.Element => {
  return (
    <Content classNames={['home', 'full', 'h-full', 'column', 'justify-center', 'align-center']}>
      <h1 className="home-title">Welcome To PollDash</h1>
      <React.Fragment>
        {!auth && (
          <Content
            classNames={['home-big-buttons', 'flex', 'xsmall', 'justify-center', 'align-center']}
          >
            <Link className="md-btn home-big-button btn highlight" to="/users/login">
              Login
            </Link>
            <Link className="md-btn home-big-button btn highlight" to="/users/register">
              Register
            </Link>
          </Content>
        )}
      </React.Fragment>
    </Content>
  )
}

export const ConnectedHome = handleExport(Home)
