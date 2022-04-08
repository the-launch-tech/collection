import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { FormikValues, FormikErrors, FormikHelpers } from 'formik'

import { Values, initialValues, handleExport, formConfig } from './config'
import validation from '../../../utils/validation'
import { InputPrefix } from '../../../components/shared/InputPrefix'
import { FormTemplate } from '../../../components/shared/form'
import { Content } from '../../../components/shared/Content'
import Maps from '../../../redux/maps'
import { DataList } from '../../../components/shared/DataList'

import { Data, Group, Model, User } from '../../../types'

export type GroupsProps = ReturnType<typeof Maps.state.Groups> &
  ReturnType<typeof Maps.dispatch.Groups> &
  RouteComponentProps

const Groups: React.FC<GroupsProps> = ({
  create,
  findGroups,
  findUsers,
  auth,
  removeGroup,
  removeUserFromGroup,
  isAuthenticated,
  users,
  groups,
}): JSX.Element => {
  const [formMessage, setFormMessage] = React.useState<string | null>(null)

  if (!auth) {
    return <React.Fragment />
  } else if (auth.role !== 'admin') {
    return <Redirect to={`/auth/${auth.id}/responses`} />
  }

  React.useEffect(() => {
    findUsers({ adminId: auth.id }).catch(console.error)
    findGroups({ creatorId: auth.id }).catch(console.error)
  }, [])

  const bootstrappedFormConfig = {
    title: 'Create Group',
    isMultiPage: false,
    fields: [
      [
        {
          width: 100,
          withCell: true,
          type: 'text',
          name: 'name',
          placeholder: 'Enter group name....',
          required: true,
          label: 'Name',
          inputPrefix: (values: FormikValues, errors: FormikErrors<FormikValues>): JSX.Element => (
            <InputPrefix errored={!values.name || !!errors.name} icon="fal fa-note" />
          ),
        },
      ],
      [
        {
          width: 100,
          withCell: true,
          type: 'checkbox',
          name: 'users',
          required: false,
          label: 'Seed Users',
          options: users.map((user: Model<User>, i: number): { label: string; value: any } => ({
            label: `${user.firstName} ${user.lastName}`,
            value: user.id.toString(),
          })),
          inputPrefix: (values: FormikValues, errors: FormikErrors<FormikValues>): JSX.Element => (
            <InputPrefix errored={false} icon="fal fa-user" />
          ),
        },
      ],
    ],
    actions: {
      hasCancel: false,
      withCell: true,
      submitIcon: 'fal fa-users',
      submitLabel: 'Create Group',
    },
    message: {
      withCell: true,
    },
  }

  async function onSubmit(values: Values, helpers: FormikHelpers<Values>): Promise<void> {
    if (!auth) {
      return
    }

    try {
      const data: Data<Group> = await create({
        body: {
          creatorId: auth.id,
          name: values.name,
          userIds: values.users,
        },
      })
      helpers.setSubmitting(false)
    } catch (err) {
      helpers.setSubmitting(false)
      setFormMessage('Error creating group')
    }
  }

  async function onRemoveGroup(event: React.MouseEvent, id: number): Promise<void> {
    await removeGroup(id).catch(console.error)
  }

  async function onRemoveUserFromGroup(
    event: React.MouseEvent,
    user: Model<User>,
    groupId: number
  ): Promise<void> {
    event.preventDefault()
    const i = users.findIndex(u => u.id === user.id)
    let userCopy = Object.assign({}, users[i])
    if (!userCopy.groups) {
      return
    }
    const index = userCopy.groups.findIndex((group: Model<Group>) => group.id === groupId)
    if (index > -1) {
      userCopy.groups.splice(index, 1)
      await removeUserFromGroup(userCopy, groupId).catch(console.error)
    }
  }

  return (
    <Content classNames={['users', 'flex', 'wrap', 'justify-start', 'align-stretch']}>
      <Content classNames={['split-container', 'w-1-2', 'mb-3']}>
        <DataList<Model<Group>>
          list={groups}
          Component={({ item, DataTitle, DataIcon }): React.ReactElement => (
            <React.Fragment>
              <DataIcon
                classNames={['fal fa-times', 'data-remove']}
                callback={(e: React.MouseEvent): Promise<void> => onRemoveGroup(e, item.id)}
              />
              <DataTitle text={item.name} />
              <div className="data-bottom">
                {(item.users || []).map((user: Model<User>, u: number) => (
                  <span key={u} className="data-bottom-item">
                    <i
                      className="fal fa-times data-remove"
                      onClick={e => onRemoveUserFromGroup(e, user, item.id)}
                    />{' '}
                    {user.firstName} {user.lastName}
                  </span>
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
            validation(values, ['name'])
          }
          onSubmit={onSubmit}
          formMessage={formMessage}
          formConfig={bootstrappedFormConfig}
          page={1}
        />
      </Content>
    </Content>
  )
}

export const ConnectedGroups = handleExport<GroupsProps>(Groups)
