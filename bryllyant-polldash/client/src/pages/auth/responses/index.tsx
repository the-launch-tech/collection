import * as React from 'react'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { Section } from '../../../components/shared/Section'
import { Content } from '../../../components/shared/Content'
import { Props, handleExport } from './config'
import { DataList } from '../../../components/shared/DataList'
import { getAnswerPercentages, getCompletionPercentages } from '../../../utils/percentages'

import { Model, Question, Response, Distribution } from '../../../types'

export type ResponsesProps = Props

const Responses: React.FC<ResponsesProps> = ({
  auth,
  receivedResponses,
  authResponses,
  findReceivedResponses,
  findAuthResponses,
  findDistributions,
  distributions,
}): JSX.Element => {
  if (!auth) {
    return <React.Fragment />
  } else if (auth.role !== 'admin') {
    return <Redirect to={`/auth/${auth.id}/responses`} />
  }

  React.useEffect(() => {
    if (auth && auth.role === 'admin') {
      findReceivedResponses({ adminId: auth.id }).catch(console.error)
      findDistributions({ adminId: auth.id }).catch(console.error)
    }
    if (auth) {
      findAuthResponses({ userId: auth.id }).catch(console.error)
    }
  }, [])

  return (
    <Content classNames={['responses', 'flex', 'wrap', 'justify-start', 'align-stretch']}>
      <Content classNames={['full', 'column', 'align-center', 'justify-start', 'mb-3']}>
        <h4 className="page-subtitle">{auth.firstName}'s Taken Responses</h4>
        <DataList<Model<Response>>
          list={authResponses}
          Component={({ item, DataTitle }): React.ReactElement => {
            return (
              <React.Fragment>
                <DataTitle text={`${item.poll.title}`} />
                <div className="data-item-interior">
                  <p>
                    <strong>Status:</strong> {item.status}
                  </p>
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
      </Content>
      <React.Fragment>
        {auth.role === 'admin' && (
          <React.Fragment>
            <Content
              classNames={[
                'split-container',
                'w-1-2',
                'column',
                'align-center',
                'justify-start',
                'mb-3',
              ]}
            >
              <h4 className="page-subtitle">{auth.firstName}'s Received Responses</h4>
              <DataList<Model<Response>>
                list={receivedResponses}
                Component={({ item, DataTitle }): React.ReactElement => (
                  <React.Fragment>
                    <DataTitle text={`${item.poll.title}`} />
                    <div className="data-item-interior">
                      <ul>
                        <li>
                          <strong>User:</strong>{' '}
                          <Link to={`/auth/${auth.id}/users/${item.user.id}`}>
                            {item.user.firstName} {item.user.lastName}
                          </Link>
                        </li>
                        <li>
                          <strong>Status:</strong> {item.status}
                        </li>
                      </ul>
                    </div>
                  </React.Fragment>
                )}
              />
            </Content>
            <Content
              classNames={[
                'split-container',
                'w-1-2',
                'column',
                'align-center',
                'justify-start',
                'mb-3',
              ]}
            >
              <h4 className="page-subtitle">{auth.firstName}'s Sent Distributions</h4>
              <DataList<Model<Distribution>>
                list={distributions}
                Component={({ item, DataTitle }): React.ReactElement => {
                  const completionPercentages = getCompletionPercentages(item.responses)
                  return (
                    <React.Fragment>
                      <DataTitle text={`Poll: ${item.poll.title}`} />
                      <div className="data-item-interior">
                        <ul>
                          <li>
                            <strong>Sent At:</strong> {moment(item.createdAt).format('LLL')}
                          </li>
                          <li>
                            <strong>Pristine Count ({completionPercentages.pristine}):</strong>{' '}
                            {
                              (item.responses || []).filter((res: any) => res.status === 'pristine')
                                .length
                            }
                          </li>
                          <li>
                            <strong>Viewed Count ({completionPercentages.viewed}):</strong>{' '}
                            {
                              (item.responses || []).filter((res: any) => res.status === 'viewed')
                                .length
                            }
                          </li>
                          <li>
                            <strong>Completion Count ({completionPercentages.completed}):</strong>{' '}
                            {
                              (item.responses || []).filter(
                                (res: any) => res.status === 'completed'
                              ).length
                            }
                          </li>
                          <li>
                            <strong>Subject:</strong> {item.subject}
                          </li>
                          <li>
                            <strong>Body:</strong>{' '}
                            <span dangerouslySetInnerHTML={{ __html: item.body }} />
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                }}
              />
            </Content>
          </React.Fragment>
        )}
      </React.Fragment>
    </Content>
  )
}

export const ConnectedResponses = handleExport(Responses)
