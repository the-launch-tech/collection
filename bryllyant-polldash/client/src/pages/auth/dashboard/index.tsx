import * as React from 'react'

import { Section } from '../../../components/shared/Section'
import { Content } from '../../../components/shared/Content'
import { capitalize } from '../../../utils/capitalize'

import { Props, handleExport } from './config'

export type DashboardProps = Props

const Dashboard: React.FC<DashboardProps> = ({ auth }): JSX.Element => {
  if (!auth) {
    return <React.Fragment />
  }

  return (
    <Content classNames={['dashboard', 'full', 'column', 'justify-start', 'align-center', 'px-2']}>
      <h4 className="dashboard-title">
        {auth.firstName}'s {capitalize(auth.role)} Overview
      </h4>
      <Content classNames={['summary', 'xsmall', 'column', 'justify-start', 'align-start']}>
        {auth.role === 'admin' ? (
          <React.Fragment>
            <p className="dashboard-paragraph">
              In the PollDash dashboard you can create users and add them to groups. If you need to
              remove a user(s) from a group you may.
            </p>
            <p className="dashboard-paragraph">
              After building your mailing list you can move on to creating polls, and questions.
              Questions can be used across multiple polls, and may be added or removed at will. All
              questions are boolean in nature.
            </p>
            <p className="dashboard-paragraph">
              To create a distribution and monitor responses simply send out the poll through our
              SendGrid provider or our mocking service. A distribution is tracked, responses are
              monitored and tied to the target user.
            </p>
            <p className="dashboard-paragraph">
              As a user, when you receive your given poll you will be provided a URL with a token
              containing a validation key matching your account to the poll so that we can confirm
              it is actually you who has started, worked on, or completed the poll and not a fraud.
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p className="dashboard-paragraph">
              As a user on PollDash you have the ability to complete surveys provided by admins.
              Either sent to you as a member of a group, or a user.
            </p>
            <p className="dashboard-paragraph">You may also view your response history.</p>
          </React.Fragment>
        )}
      </Content>
    </Content>
  )
}

export const ConnectedDashboard = handleExport(Dashboard)
