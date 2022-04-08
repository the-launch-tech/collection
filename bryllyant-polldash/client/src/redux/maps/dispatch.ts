import { GenericThunk, AuthThunk } from '../thunks'
import {
  AuthAction,
  AuxAction,
  UserAction,
  GroupAction,
  QuestionAction,
  PollAction,
  ResponseAction,
  DistributionAction,
} from '../actions'

import {
  Model,
  State,
  Create,
  FindByIds,
  UpdateById,
  Confirm,
  Data,
  User,
  Poll,
  Group,
  Distribution,
  Question,
  Response,
  CreatePoll,
  CreateUser,
  CreateGroup,
  CreateDistribution,
  UpdateResponse,
  RemoveUser,
  WrappedThunkDispatch,
  ModalOptions,
} from '../../types'

export default {
  Main: (dispatch: WrappedThunkDispatch<never>) => ({
    authenticate: () => dispatch(AuthThunk.authenticate()),
    loading: (isLoading: boolean) => dispatch(AuxAction.loading(isLoading)),
  }),
  Header: (dispatch: WrappedThunkDispatch<never>) => ({
    logout: () => dispatch(AuthAction.logout()),
  }),
  Settings: (dispatch: WrappedThunkDispatch<never>) => ({
    mountAuth: (auth: Data<User>) => dispatch(AuthAction.mount(auth)),
  }),
  Register: (dispatch: WrappedThunkDispatch<never>) => ({
    register: async (options: Create<CreateUser>) =>
      await GenericThunk.create<User, CreateUser, never>(dispatch, 'users', options.body),
  }),
  Login: (dispatch: WrappedThunkDispatch<never>) => ({
    login: async (body: { email: string; password: string }) =>
      await dispatch(AuthThunk.login(body)),
  }),
  Survey: (dispatch: WrappedThunkDispatch<never>) => ({
    onModalChange: (options: ModalOptions) => dispatch(AuxAction.modal(options)),
    findResponseData: async (id: number) =>
      await GenericThunk.findOne<Response, Function>(
        dispatch,
        'responses',
        id,
        (response: Model<Response>): void => {
          dispatch(ResponseAction.storeActiveResponses(response))
        }
      ),
    updateResponse: async (id: number, responseResult: UpdateResponse) =>
      await GenericThunk.update<Response, UpdateResponse, Function>(
        dispatch,
        'responses',
        id,
        responseResult,
        false,
        (response: Model<Response>): void => {
          dispatch(ResponseAction.update(response))
        }
      ),
  }),
  Responses: (dispatch: WrappedThunkDispatch<never>) => ({
    findReceivedResponses: async (options: { adminId: number }) =>
      await GenericThunk.find<Response, Function>(
        dispatch,
        'responses',
        options,
        (response: Model<Response>[]): void => {
          dispatch(ResponseAction.storeReceivedResponses(response))
        }
      ),
    findAuthResponses: async (options: { userId: number }) =>
      await GenericThunk.find<Response, Function>(
        dispatch,
        'responses',
        options,
        (response: Model<Response>[]): void => {
          dispatch(ResponseAction.storeAuthResponses(response))
        }
      ),
    findDistributions: async (options: { adminId?: number }) =>
      await GenericThunk.find<Distribution, Function>(
        dispatch,
        'distributions',
        options,
        (response: Model<Distribution>[]): void => {
          dispatch(DistributionAction.storeDistributions(response))
        }
      ),
  }),
  User: (dispatch: WrappedThunkDispatch<never>) => ({
    findUserResponses: async (options: { userId: number }) =>
      await GenericThunk.find<Response, Function>(
        dispatch,
        'responses',
        options,
        (response: Model<Response>[]): void => {
          dispatch(ResponseAction.storeUserResponses(response))
        }
      ),
  }),
  Distributions: (dispatch: WrappedThunkDispatch<never>) => ({
    findDistributions: async (options: { adminId?: number }) =>
      await GenericThunk.find<Distribution, Function>(
        dispatch,
        'distributions',
        options,
        (response: Model<Distribution>[]): void => {
          dispatch(DistributionAction.storeDistributions(response))
        }
      ),
  }),
  Users: (dispatch: WrappedThunkDispatch<never>) => ({
    create: async (options: Create<CreateUser>) =>
      await GenericThunk.create<User, CreateUser, Function>(
        dispatch,
        'users',
        options.body,
        (response: Model<User>) => {
          dispatch(UserAction.create(response))
        }
      ),
    findUsers: async (options?: { adminId?: number }) =>
      await GenericThunk.find<User, Function>(
        dispatch,
        'users',
        options,
        (response: Model<User>[]): void => {
          dispatch(UserAction.storeUsers(response))
        }
      ),
    removeUser: async (id: number) =>
      await GenericThunk.remove<Function>(dispatch, 'users', id, (response: Confirm): void => {
        dispatch(UserAction.removeUser(response ? id : null))
      }),
    removeUserFromGroup: async (user: Model<User>, groupId: number) =>
      await GenericThunk.update<Group, RemoveUser, Function>(
        dispatch,
        'groups',
        groupId,
        { userIds: [user.id] },
        'users/unmerge',
        (response: Model<Group>): void => {
          dispatch(UserAction.updateUser(user))
          dispatch(GroupAction.updateGroup(response))
        }
      ),
  }),
  Polls: (dispatch: WrappedThunkDispatch<never>) => ({
    loading: (isLoading: boolean) => dispatch(AuxAction.loading(isLoading)),
    onModalChange: (options: ModalOptions) => dispatch(AuxAction.modal(options)),
    create: async (options: Create<CreatePoll>) =>
      await GenericThunk.create<Poll, CreatePoll, never>(
        dispatch,
        'polls',
        options.body,
        (response: Model<Poll>) => {
          dispatch(PollAction.create(response))
        }
      ),
    createDistribution: async (options: Create<CreateDistribution>) =>
      await GenericThunk.create<Distribution, CreateDistribution, Function>(
        dispatch,
        'distributions',
        options.body,
        (response: Model<Distribution>): void => {
          dispatch(DistributionAction.create(response))
        }
      ),
    findPolls: async (options: { authorId?: number }) =>
      await GenericThunk.find<Poll, Function>(
        dispatch,
        'polls',
        options,
        (response: Model<Poll>[]): void => {
          dispatch(PollAction.storePolls(response))
        }
      ),
    findUsers: async (options?: { adminId?: number }) =>
      await GenericThunk.find<User, Function>(
        dispatch,
        'users',
        options,
        (response: Model<User>[]): void => {
          dispatch(UserAction.storeUsers(response))
        }
      ),
    findGroups: async (options: { creatorId?: number }) =>
      await GenericThunk.find<Group, Function>(
        dispatch,
        'groups',
        options,
        (response: Model<Group>[]): void => {
          dispatch(GroupAction.storeGroups(response))
        }
      ),
    removePoll: async (id: number) =>
      await GenericThunk.remove<Function>(dispatch, 'polls', id, (response: Confirm): void => {
        dispatch(PollAction.removePoll(response ? id : null))
      }),
    removeQuestionFromPoll: async (question: Model<Question>, pollId: number) =>
      await GenericThunk.update<Poll, RemoveUser, Function>(
        dispatch,
        'polls',
        pollId,
        { questionIds: [question.id] },
        'remove/questions',
        (response: Model<Poll>): void => {
          dispatch(QuestionAction.updateQuestion(question))
          dispatch(PollAction.updatePoll(response))
        }
      ),
  }),
  Groups: (dispatch: WrappedThunkDispatch<never>) => ({
    create: async (options: Create<CreateGroup>) =>
      await GenericThunk.create<Group, CreateGroup, never>(
        dispatch,
        'groups',
        options.body,
        (response: Model<Group>) => {
          dispatch(GroupAction.create(response))
        }
      ),
    findUsers: async (options?: { adminId?: number }) =>
      await GenericThunk.find<User, Function>(
        dispatch,
        'users',
        options,
        (response: Model<User>[]): void => {
          dispatch(UserAction.storeUsers(response))
        }
      ),
    findGroups: async (options: { creatorId?: number }) =>
      await GenericThunk.find<Group, Function>(
        dispatch,
        'groups',
        options,
        (response: Model<Group>[]): void => {
          dispatch(GroupAction.storeGroups(response))
        }
      ),
    removeGroup: async (id: number) =>
      await GenericThunk.remove<Function>(dispatch, 'groups', id, (response: Confirm): void => {
        dispatch(GroupAction.removeGroup(response ? id : null))
      }),
    removeUserFromGroup: async (user: Model<User>, groupId: number) =>
      await GenericThunk.update<Group, RemoveUser, Function>(
        dispatch,
        'groups',
        groupId,
        { userIds: [user.id] },
        'users/unmerge',
        (response: Model<Group>): void => {
          dispatch(UserAction.updateUser(user))
          dispatch(GroupAction.updateGroup(response))
        }
      ),
  }),
}
