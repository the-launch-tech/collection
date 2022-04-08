import * as React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { FormikValues, FormikErrors, FormikHelpers } from 'formik'

import { Values, initialValues, handleExport, formConfig } from './config'
import validation from '../../../utils/validation'
import { FormTemplate } from '../../../components/shared/form'
import { Content } from '../../../components/shared/Content'
import { PollModal } from './PollModal'
import Maps from '../../../redux/maps'
import { DataList } from '../../../components/shared/DataList'

import { Data, Poll, Model, Question, Group, User } from '../../../types'

export type PollsProps = ReturnType<typeof Maps.state.Polls> &
  ReturnType<typeof Maps.dispatch.Polls> &
  RouteComponentProps

const Polls: React.FC<PollsProps> = ({
  create,
  auth,
  isAuthenticated,
  polls,
  findPolls,
  findUsers,
  findGroups,
  removePoll,
  removeQuestionFromPoll,
  onModalChange,
  loading,
  users,
  groups,
  createDistribution,
}): JSX.Element => {
  const [formMessage, setFormMessage] = React.useState<string | null>(null)
  const [sendOptions, setSendOptions] = React.useState<any>({})

  if (!auth) {
    return <React.Fragment />
  } else if (auth.role !== 'admin') {
    return <Redirect to={`/auth/${auth.id}/responses`} />
  }

  React.useEffect(() => {
    findPolls({ authorId: auth.id }).catch(console.error)
    findUsers({ adminId: auth.id }).catch(console.error)
    findGroups({ creatorId: auth.id }).catch(console.error)
  }, [])

  React.useEffect(() => {
    loading(true)
    if (sendOptions.pending) {
      createDistribution({
        body: {
          provider: sendOptions.provider,
          userIds: sendOptions.userIds,
          groupIds: sendOptions.groupIds,
          adminId: sendOptions.adminId,
          pollId: sendOptions.pollId,
          subject: 'Take the PollDash Poll: ' + sendOptions.title,
          body: `<p>Please follow <a href="[LINK_CALLBACK]" target="_blank">this link</a> to take your poll.</p>`,
        },
      })
        .then(() => {
          setSendOptions({ ...sendOptions, pending: false })
          onModalChange({ active: false })
          setTimeout(() => loading(false), 500)
        })
        .catch(console.error)
    }
  }, [sendOptions.pending])

  async function onSubmit(values: Values, helpers: FormikHelpers<Values>): Promise<void> {
    if (!auth) {
      return
    }

    try {
      const data: Data<Poll> = await create({
        body: {
          text: values.questions.map(question => question.text).filter(Boolean),
          authorId: auth.id,
          title: values.title,
        },
      })
      helpers.setSubmitting(false)
    } catch (err) {
      helpers.setSubmitting(false)
      setFormMessage('Error creating poll')
    }
  }

  async function onRemovePoll(event: React.MouseEvent, id: number): Promise<void> {
    await removePoll(id).catch(console.error)
  }

  async function onRemoveQuestionFromPoll(
    event: React.MouseEvent,
    question: Model<Question>,
    pollId: number
  ): Promise<void> {
    event.preventDefault()
    let questionCopy = Object.assign({}, question)
    if (!questionCopy.polls) {
      return
    }
    const index = questionCopy.polls.findIndex((poll: Model<Poll>) => poll.id === pollId)
    if (index > -1) {
      questionCopy.polls.splice(index, 1)
      await removeQuestionFromPoll(questionCopy, pollId).catch(console.error)
    }
  }

  function onOpenSendModal(event: React.MouseEvent, poll: Model<Poll>): void {
    onModalChange({
      active: true,
      Component: () => (
        <PollModal poll={poll} users={users} groups={groups} auth={auth} onSendPoll={onSendPoll} />
      ),
      onClose: (event: React.MouseEvent) => {
        onModalChange({ active: false })
      },
    })
  }

  function onSendPoll(newSendOptions: any): void {
    setSendOptions({ ...newSendOptions, pending: true })
  }

  return (
    <Content classNames={['polls', 'flex', 'wrap', 'justify-start', 'align-stretch']}>
      <Content classNames={['split-container', 'w-1-2', 'mb-3']}>
        <DataList<Model<Poll>>
          list={polls}
          Component={({ item, DataTitle, DataIcon }): React.ReactElement => (
            <React.Fragment>
              <DataIcon
                classNames={['fal fa-times', 'data-remove']}
                callback={(e: React.MouseEvent): Promise<void> => onRemovePoll(e, item.id)}
              />
              <DataIcon
                classNames={['fal fa-paper-plane', 'data-send']}
                callback={(e: React.MouseEvent): void => onOpenSendModal(e, item)}
              />
              <DataTitle text={item.title} />
              <div className="data-bottom">
                {item.questions.map((question: Model<Question>, q: number) => (
                  <div key={q} className="data-bottom-item">
                    <i
                      className="fal fa-times data-remove"
                      onClick={e => onRemoveQuestionFromPoll(e, question, item.id)}
                    />{' '}
                    {question.text}
                  </div>
                ))}
              </div>
            </React.Fragment>
          )}
        />
      </Content>
      <Content classNames={['split-container', 'w-1-2', 'h-full', 'mb-3']}>
        <FormTemplate
          maxWidth="md"
          initialValues={initialValues}
          validate={(values: FormikValues): FormikErrors<FormikValues> =>
            validation(values, ['title', 'questions'])
          }
          onSubmit={onSubmit}
          formMessage={formMessage}
          formConfig={formConfig}
          page={1}
        />
      </Content>
    </Content>
  )
}

export const ConnectedPolls = handleExport<PollsProps>(Polls)
