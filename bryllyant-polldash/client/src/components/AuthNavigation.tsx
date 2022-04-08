import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link, RouteComponentProps } from 'react-router-dom'

import Maps from '../redux/maps'

export type AuthNavigationProps = RouteComponentProps & ReturnType<typeof Maps.state.Header>

const AuthNavigation: React.FC<AuthNavigationProps> = ({ auth, isAuthenticated }): JSX.Element => {
  const [mobile, setMobile] = React.useState<boolean>(window.innerWidth < 992)
  const [toggled, setToggled] = React.useState<boolean>(false)
  let nav: any

  React.useEffect(() => {
    console.log('mobile', mobile)
  }, [mobile])

  if (!auth || !isAuthenticated) {
    return <React.Fragment />
  }

  const items = [
    { to: `/auth/${auth.id}`, label: 'Overview', admin: false },
    { to: `/auth/${auth.id}/users`, label: 'User Management', admin: true },
    { to: `/auth/${auth.id}/groups`, label: 'Group Management', admin: true },
    { to: `/auth/${auth.id}/polls`, label: 'Poll Delegation', admin: true },
    { to: `/auth/${auth.id}/distributions`, label: 'Distribution Meta', admin: true },
    { to: `/auth/${auth.id}/responses`, label: 'Response History', admin: false },
  ]

  function navRef(ref: any) {
    nav = ref
    window.removeEventListener('resize', onResize)
    window.addEventListener('resize', onResize)
  }

  function onResize(e: any): void {
    if (window.innerWidth > 991 && mobile) {
      setMobile(false)
    } else if (window.innerWidth < 992 && !mobile) {
      setMobile(true)
    }
  }

  function onToggle(event: React.MouseEvent): void {
    setToggled(!toggled)
  }

  return (
    <div
      className={`auth-sidebar ${mobile ? 'mobile-nav' : ''} ${
        mobile && toggled ? 'toggled-nav' : ''
      }`}
      ref={navRef}
    >
      <nav className="auth-nav">
        {mobile && <i className="fal fa-bars" onClick={onToggle} />}
        <ul className="auth-menu">
          {items.map((item: any, i: number) => {
            if ((item.admin && auth.role === 'admin') || !item.admin) {
              return (
                <li key={i} className="auth-menu-item">
                  <Link
                    to={item.to}
                    className={`auth-menu-anchor ${
                      location.pathname === item.to ? 'auth-menu-active' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            }
            return <React.Fragment key={i} />
          })}
        </ul>
      </nav>
    </div>
  )
}

export const WrappedAuthNavigation = connect(Maps.state.Header)(withRouter(AuthNavigation))
