import { authenticateUser as doAuthenticateUser } from '../../data/trello'

const actions = {
  START_AUTHORIZING: 'START_AUTHORIZING',
  DONE_AUTHORIZING: 'DONE_AUTHORIZING',
}

const startAuthentication = () => ({ type: actions.START_AUTHORIZING })

const doneAuthentication = (success, error = null) => ({
  type: actions.DONE_AUTHORIZING,
  success,
  error,
})

const authenticateUser = () => async dispatch => {
  dispatch(startAuthentication())
  try {
    await doAuthenticateUser()
    dispatch(doneAuthentication(true))
  } catch (e) {
    dispatch(doneAuthentication(null, e))
  }
}

export { actions, authenticateUser }
