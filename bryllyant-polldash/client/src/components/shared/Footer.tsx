import * as React from 'react'
import { Link } from 'react-router-dom'

export type FooterProps = {}

export const Footer: React.FC<FooterProps> = ({ children }): JSX.Element => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <span className="site-text">©2020 PollDash | Daniel Griffiths</span>
      </div>
    </footer>
  )
}
