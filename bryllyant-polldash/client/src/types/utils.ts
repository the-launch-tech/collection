import * as React from 'react'

export type NavigationRoute = {
  path: string | null
  label: string
  auth: boolean
  icon: string | null
  children: NavigationRoute[] | null
  href?: string | null
  onClick?: Function | null
}

export type ModalOptions = {
  active: boolean
  Component?: any
  onClose?: (event: React.MouseEvent) => void
}
