import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter, RouteComponentProps } from 'react-router'

import { navRight, navLeft } from '../../utils/navigation'
import Maps from '../../redux/maps'
import logo from '../../assets/images/bryllyant-logo-lg.png'

export type HeaderProps = any

const Header: React.FC<HeaderProps> = ({
  location,
  auth,
  isAuthenticated,
  logout,
}): JSX.Element => {
  const navRightConfig = React.useMemo(
    () => navRight(location, { id: auth ? auth.id : null, handleLogout }),
    [location.pathname, auth]
  )

  const navLeftConfig = React.useMemo(() => navLeft(location, { id: auth ? auth.id : null }), [
    location.pathname,
    auth,
  ])

  const hasAuthAccess = React.useMemo(() => isAuthenticated, [
    auth,
    isAuthenticated,
    location.pathname,
  ])

  const isItemActive = (item: any, location: any): string => {
    return location.pathname === item.path ? 'nav-active' : ''
  }

  function renderNavigation(item: any, i: number): JSX.Element {
    if (!hasAuthAccess && item.auth) {
      return <React.Fragment key={i} />
    }

    function NavAnchor({ item }: any): JSX.Element {
      function IconLabel({ item }: any): JSX.Element {
        return (
          <React.Fragment>
            {!!item.icon && <i className={item.icon} />} {item.label}
          </React.Fragment>
        )
      }

      const isActive = isItemActive(item, location)

      if (!!item.path) {
        return (
          <Link to={item.path || ''} className={`menu-item-anchor ${isActive}`}>
            <IconLabel item={item} />
          </Link>
        )
      } else if (!!item.href) {
        return (
          <a href={item.href} className={`menu-item-anchor ${isActive}`}>
            <IconLabel item={item} />
          </a>
        )
      } else if (!!item.onClick) {
        return (
          <span className="menu-item-anchor" onClick={item.onClick}>
            <IconLabel item={item} />
          </span>
        )
      }
      return (
        <span className="menu-item-label">
          <IconLabel item={item} />
        </span>
      )
    }

    return (
      <li key={i.toString()} className={`menu-item`}>
        <NavAnchor item={item} />
      </li>
    )
  }

  async function handleLogout(event: React.MouseEvent): Promise<void> {
    console.log('logout')
    await logout()
  }

  return (
    <header className="header">
      <nav className="nav">
        <ul className="menu left-menu">
          <li className="menu-item-logo">
            <Link to="/">
              <img src={logo} alt="Chart Logo" title="Chart Logo for PollDash" />
            </Link>
          </li>
          {navLeftConfig.map(renderNavigation)}
        </ul>
        <ul className="menu right-menu">{navRightConfig.map(renderNavigation)}</ul>
      </nav>
    </header>
  )
}

export const ConnectedHeader = connect(
  Maps.state.Header,
  Maps.dispatch.Header
)(withRouter(Header))
