import { State } from '../types'

export default <State>{
  Auth: {
    isAuthenticated: false,
    auth: null,
  },
  Poll: {
    polls: [],
  },
  Aux: {
    loading: true,
    modal: {
      active: false,
    },
  },
  Group: {
    groups: [],
  },
  Distribution: {
    distributions: [],
  },
  Question: {
    questions: [],
  },
  Response: {
    activeResponse: null,
    receivedResponses: [],
    authResponses: [],
    userResponses: [],
  },
  User: {
    users: [],
  },
}
