import * as React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { FormikValues, FormikErrors, FormikHelpers } from 'formik'

import { Props, Values, initialValues, handleExport, formConfig } from './config'
import validation from '../../../utils/validation'
import { FormTemplate } from '../../../components/shared/form'
import { Content } from '../../../components/shared/Content'
import { DataList } from '../../../components/shared/DataList'

import { Data, User, Model, Group } from '../../../types'

export type UsersProps = Props

const Users: React.FC<UsersProps> = ({
  create,
  auth,
  isAuthenticated,
  users,
  findUsers,
  removeUser,
  removeUserFromGroup,
}): JSX.Element => {
  const [formMessage, setFormMessage] = React.useState<string | null>(null)

  if (!auth) {
    return <React.Fragment />
  } else if (auth.role !== 'admin') {
    return <Redirect to={`/auth/${auth.id}/responses`} />
  }

  React.useEffect(() => {
    findUsers({ adminId: auth.id }).catch(console.error)
  }, [])

  async function onSubmit(values: Values, helpers: FormikHelpers<Values>): Promise<void> {
    if (!auth) {
      return
    }

    try {
      const data: Data<User> = await create({ body: { ...values, adminId: auth.id } })
      helpers.setSubmitting(false)
    } catch (err) {
      helpers.setSubmitting(false)
      setFormMessage('Error registering user')
    }
  }

  async function onRemoveUser(event: React.MouseEvent, id: number): Promise<void> {
    event.preventDefault()
    await removeUser(id).catch(console.error)
  }

  async function onRemoveUserFromGroup(
    event: React.MouseEvent,
    user: Model<User>,
    groupId: number
  ): Promise<void> {
    event.preventDefault()
    let userCopy = Object.assign({}, user)
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
        <DataList<Model<User>>
          list={users}
          Component={({ item, DataTitle, DataIcon }): React.ReactElement => (
            <React.Fragment>
              <DataIcon
                classNames={['fal fa-times', 'data-remove']}
                callback={(e: React.MouseEvent): Promise<void> => onRemoveUser(e, item.id)}
              />
              <Link
                to={`/auth/${auth.id}/users/${item.id}`}
                className="users-link"
                style={{ cursor: 'pointer' }}
              >
                <DataTitle text={`${item.firstName} ${item.lastName}`} />
              </Link>
              <div className="data-bottom">
                {(item.groups || []).map((group: Model<Group>, g: number) => (
                  <span key={g} className="data-bottom-item">
                    <i
                      className="fal fa-times data-remove"
                      onClick={(e: React.MouseEvent): Promise<void> =>
                        onRemoveUserFromGroup(e, item, group.id)
                      }
                    />{' '}
                    {group.name}
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
            validation(values, ['firstName', 'lastName', 'email', 'mobile', 'role'])
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

export const ConnectedUsers = handleExport(Users)
