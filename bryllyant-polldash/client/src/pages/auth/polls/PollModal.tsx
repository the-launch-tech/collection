import * as React from 'react'

import { Model, User, Group, Poll } from '../../../types'

export type PollModalProps = {
  poll: Model<Poll>
  users: Model<User>[]
  groups: Model<Group>[]
  onSendPoll: Function
  auth: Model<User> | null
}

export const PollModal: React.FC<PollModalProps> = ({
  poll,
  users,
  groups,
  onSendPoll,
  auth,
}): JSX.Element => {
  const [sendOptions, setSendOptions] = React.useState<any>({
    userIds: [],
    groupIds: [],
    provider: 'SENDGRID',
    valid: false,
    pending: false,
  })

  function onSelectUser(event: React.MouseEvent, id: number): void {
    const options = Object.assign({}, sendOptions)
    const index = options.userIds.indexOf(id)
    if (index > -1) {
      options.userIds.splice(index, 1)
    } else {
      options.userIds = [...options.userIds, id]
    }
    if (options.userIds.length || (options.groupIds.length && options.provider)) {
      options.valid = true
    }
    setSendOptions(options)
  }

  function onSelectGroup(event: React.MouseEvent, id: number): void {
    const options = Object.assign({}, sendOptions)
    const index = options.groupIds.indexOf(id)
    if (index > -1) {
      options.groupIds.splice(index, 1)
    } else {
      options.groupIds = [...options.groupIds, id]
    }
    if (options.userIds.length || (options.groupIds.length && options.provider)) {
      options.valid = true
    }
    setSendOptions(options)
  }

  function onSelectProvider(event: React.MouseEvent, slug: string): void {
    const options = Object.assign({}, sendOptions)
    options.provider = slug
    console.log('options.provider', options.provider, slug)
    if (options.userIds.length || (options.groupIds.length && options.provider)) {
      options.valid = true
    }
    setSendOptions(options)
  }

  function handleSendPoll(event: React.MouseEvent, poll: Model<Poll>): void {
    if (!auth) return
    onSendPoll({ ...sendOptions, pollId: poll.id, adminId: auth.id, title: poll.title })
  }

  return (
    <div className="modal-content">
      <div className="modal-section">
        <h4 className="modal-section-title">Select Recipients</h4>
        <div className="modal-section">
          <h5 className="modal-section-title">Users</h5>
          <div className="modal-section-items">
            {users.map(
              (user: Model<User>, i: number): JSX.Element => (
                <div
                  key={i}
                  onClick={e => onSelectUser(e, user.id)}
                  className={`modal-section-item ${
                    sendOptions.userIds.includes(user.id) ? 'selected-item' : ''
                  }`}
                >
                  {user.firstName} {user.lastName}
                </div>
              )
            )}
          </div>
        </div>
        <div className="modal-section">
          <h5 className="modal-section-title">Groups</h5>
          <div className="modal-section-items">
            {groups.map(
              (group: Model<Group>, i: number): JSX.Element => (
                <div
                  key={i}
                  onClick={e => onSelectGroup(e, group.id)}
                  className={`modal-section-item ${
                    sendOptions.groupIds.includes(group.id) ? 'selected-item' : ''
                  }`}
                >
                  {group.name}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="modal-section">
        <h5 className="modal-section-title">Choose Provider</h5>
        <div className="modal-section-items">
          <span
            onClick={e => onSelectProvider(e, 'SENDGRID')}
            className={`modal-section-item ${
              sendOptions.provider === 'SENDGRID' ? 'selected-item' : ''
            }`}
          >
            SendGrid
          </span>
          <span
            onClick={e => onSelectProvider(e, 'MOCK')}
            className={`modal-section-item ${
              sendOptions.provider === 'MOCK' ? 'selected-item' : ''
            }`}
          >
            Mock
          </span>
        </div>
      </div>
      <div className="modal-section">
        <button
          className="modal-section-button"
          onClick={e => handleSendPoll(e, poll)}
          disabled={!sendOptions.valid}
        >
          Send Poll
        </button>
      </div>
    </div>
  )
}
