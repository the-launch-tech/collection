import * as React from 'react'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

import { Section } from '../../../components/shared/Section'
import { Content } from '../../../components/shared/Content'
import { Props, handleExport } from './config'
import { DataList } from '../../../components/shared/DataList'
import { getAnswerPercentages, getCompletionPercentages } from '../../../utils/percentages'

import { Model, Question, Response, Distribution } from '../../../types'

export type DistributionsProps = Props

const Distributions: React.FC<DistributionsProps> = ({
  auth,
  findDistributions,
  distributions,
}): JSX.Element => {
  if (!auth) {
    return <React.Fragment />
  } else if (auth.role !== 'admin') {
    return <Redirect to={`/auth/${auth.id}/responses`} />
  }

  React.useEffect(() => {
    findDistributions({ adminId: auth.id }).catch(console.error)
  }, [])

  console.log('distributions', distributions)

  return (
    <Content classNames={['responses', 'flex', 'wrap', 'justify-start', 'align-stretch']}>
      <Content classNames={['w-full', 'column', 'align-center', 'justify-start', 'mb-3']}>
        <h4 className="page-subtitle">Distributions Meta</h4>
        <DataList<Model<Distribution>>
          list={distributions}
          Component={({ item, DataTitle }): React.ReactElement => {
            const completionPercentages = getCompletionPercentages(item.responses)
            return (
              <React.Fragment>
                <div className="data-item-split">
                  <div className="data-item-split-container">
                    <h5>Distribution Meta:</h5>
                    <ul className="data-item-split-list">
                      <li>
                        <strong>Poll Title:</strong> {item.poll.title}
                      </li>
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
                          (item.responses || []).filter((res: any) => res.status === 'completed')
                            .length
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
                    {item.questions && (
                      <div>
                        <h5>Question Statistics</h5>
                        <ul style={{ listStyle: 'none' }}>
                          {item.questions.map((question: any, i: number) => {
                            const percentages = getAnswerPercentages(question, item.responses)
                            return (
                              <li>
                                {question.text}
                                <ul style={{ marginLeft: 30, listStyle: 'none' }}>
                                  <li>
                                    <strong>Yes:</strong> {percentages.yes}
                                  </li>
                                  <li>
                                    <strong>No:</strong> {percentages.no}
                                  </li>
                                  <li>
                                    <strong>Blank:</strong> {percentages.blank}
                                  </li>
                                </ul>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="data-item-split-container">
                    <h5>Distribution Mocks:</h5>
                    <ul className="data-item-split-list">
                      {item.responses.map((response: any, i: number) => (
                        <li key={i}>
                          Response ({response.id})
                          <ul>
                            <li>
                              <strong>Last Updatedt:</strong>{' '}
                              {moment(response.updatedAt).format('LLL')}
                            </li>
                            <li>
                              <strong>Status:</strong> {response.status}
                            </li>
                            <li>
                              <strong>Mock Link:</strong> <small>{response.mock}</small>
                            </li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )
          }}
        />
      </Content>
    </Content>
  )
}

export const ConnectedDistributions = handleExport(Distributions)
