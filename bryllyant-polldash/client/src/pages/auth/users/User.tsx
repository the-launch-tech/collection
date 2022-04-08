import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { RouteComponentProps, withRouter } from 'react-router'

import { Section } from '../../../components/shared/Section'
import { Content } from '../../../components/shared/Content'
import { DataList } from '../../../components/shared/DataList'
import { getAnswerPercentages, getCompletionPercentages } from '../../../utils/percentages'
import Http from '../../../Http'
import HttpService from '../../../services'
import Maps from '../../../redux/maps'

import { Model, Question, Response, User } from '../../../types'

export type UsersProps = RouteComponentProps<{ id: string; userId: string }> &
  ReturnType<typeof Maps.state.User> &
  ReturnType<typeof Maps.dispatch.User>

const SingleUser: React.FC<UsersProps> = ({
  auth,
  findUserResponses,
  userResponses,
  match,
}): JSX.Element => {
  const [totalResults, setTotalResults] = React.useState({
    pristine: `0.00%`,
    viewed: `0.00%`,
    completed: `0.00%`,
  })
  const [user, setUser] = React.useState<Model<User> | any>({})

  if (!auth) {
    return <React.Fragment />
  } else if (auth.role !== 'admin') {
    return <Redirect to={`/auth/${auth.id}/responses`} />
  }

  React.useEffect(() => {
    setTotalResults(getCompletionPercentages(userResponses))
  }, [userResponses])

  React.useEffect(() => {
    const userId = parseInt(match.params.userId)
    HttpService.findOne<User>(Http(localStorage.getItem('pd_access_token')), {
      prefix: 'users',
      id: userId,
    })
      .then(user => setUser(user))
      .catch(console.error)
    findUserResponses({ userId }).catch(console.error)
  }, [])

  console.log('userResponses', userResponses)

  return (
    <Content classNames={['user-responses', 'flex', 'wrap', 'justify-start', 'align-stretch']}>
      <Content classNames={['w-full', 'column', 'align-center', 'justify-start', 'mb-3']}>
        <h4 className="page-subtitle">
          {user.firstName} {user.lastName}'s Responses
        </h4>
        <div>
          <h5>Total Breakdown</h5>
          <ul>
            <li>
              <strong>Pristine Count ({totalResults.pristine}):</strong>{' '}
              {(userResponses || []).filter((res: any) => res.status === 'pristine').length}
            </li>
            <li>
              <strong>Viewed Count ({totalResults.viewed}):</strong>{' '}
              {(userResponses || []).filter((res: any) => res.status === 'viewed').length}
            </li>
            <li>
              <strong>Completion Count ({totalResults.completed}):</strong>{' '}
              {(userResponses || []).filter((res: any) => res.status === 'completed').length}
            </li>
          </ul>
        </div>
        <div style={{ width: '100%' }}>
          <h5 style={{ textAlign: 'center' }}>Per Response</h5>
          <DataList<Model<Response>>
            list={userResponses}
            Component={({ item, DataTitle }): React.ReactElement => {
              return (
                <React.Fragment>
                  <DataTitle text={`${item.poll.title}`} />
                  <div className="data-item-interior">
                    <p>
                      <strong>Status:</strong> {item.status}
                    </p>
                    <p>
                      <strong>Sent:</strong> {moment(item.createdAt).format('LLL')}
                    </p>
                    <p>
                      <strong>Last Updated:</strong> {moment(item.updatedAt).format('LLL')}
                    </p>
                    <h5>Questions</h5>
                    <ul>
                      {(item.poll.questions || []).map((question: Model<any>, q: number) => (
                        <li>
                          {question.text}{' '}
                          {item.responseQuestions && item.responseQuestions[q] ? (
                            <strong>{item.responseQuestions[q].answer}</strong>
                          ) : (
                            <strong>No Answer</strong>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </React.Fragment>
              )
            }}
          />
        </div>
      </Content>
    </Content>
  )
}

export const ConnectedUser = connect(
  Maps.state.User,
  Maps.dispatch.User
)(withRouter(SingleUser))
