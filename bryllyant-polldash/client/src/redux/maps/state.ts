import { State } from '../../types'

export default {
  Auth: (state: State) => ({
    auth: state.Auth.auth,
    isAuthenticated: state.Auth.isAuthenticated,
  }),
  Main: (state: State) => ({
    auth: state.Auth.auth,
    isAuthenticated: state.Auth.isAuthenticated,
  }),
  Home: (state: State) => ({
    auth: state.Auth.auth,
    isAuthenticated: state.Auth.isAuthenticated,
  }),
  Register: (state: State) => ({
    auth: state.Auth.auth,
    isAuthenticated: state.Auth.isAuthenticated,
  }),
  Login: (state: State) => ({
    auth: state.Auth.auth,
    isAuthenticated: state.Auth.isAuthenticated,
  }),
  Header: (state: State) => ({
    auth: state.Auth.auth,
    isAuthenticated: state.Auth.isAuthenticated,
  }),
  Dashboard: (state: State) => ({
    auth: state.Auth.auth,
    isAuthenticated: state.Auth.isAuthenticated,
  }),
  Loader: (state: State) => ({
    loading: state.Aux.loading,
  }),
  Modal: (state: State) => ({
    modal: state.Aux.modal,
  }),
  Users: (state: State) => ({
    auth: state.Auth.auth,
    isAuthenticated: state.Auth.isAuthenticated,
    users: state.User.users,
  }),
  Polls: (state: State) => ({
    auth: state.Auth.auth,
    isAuthenticated: state.Auth.isAuthenticated,
    polls: state.Poll.polls,
    questions: state.Question.questions,
    users: state.User.users,
    groups: state.Group.groups,
  }),
  Groups: (state: State) => ({
    auth: state.Auth.auth,
    isAuthenticated: state.Auth.isAuthenticated,
    users: state.User.users,
    groups: state.Group.groups,
  }),
  Survey: (state: State) => ({
    auth: state.Auth.auth,
    isAuthenticated: state.Auth.isAuthenticated,
    response: state.Response.activeResponse,
  }),
  Responses: (state: State) => ({
    auth: state.Auth.auth,
    isAuthenticated: state.Auth.isAuthenticated,
    authResponses: state.Response.authResponses,
    receivedResponses: state.Response.receivedResponses,
    distributions: state.Distribution.distributions,
  }),
  Distributions: (state: State) => ({
    auth: state.Auth.auth,
    isAuthenticated: state.Auth.isAuthenticated,
    distributions: state.Distribution.distributions,
  }),
  User: (state: State) => ({
    auth: state.Auth.auth,
    isAuthenticated: state.Auth.isAuthenticated,
    userResponses: state.Response.userResponses,
  }),
}
